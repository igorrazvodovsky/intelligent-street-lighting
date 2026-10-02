import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators'
import { UserEvent, DeviceEvent } from '~local/types'
import { CityService } from './city.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _deviceEvents = this.cityService.data('deviceEvents')
  private _userEvents = this.cityService.data('userEvents')

  constructor(private cityService: CityService) { }

  getEvents(): Observable<any[]> {
    return zip(
      this.getDeviceEvents(),
      this.getUserEvents()
    ).pipe(
      map(x => x.flat()),
      map((data) => {
        data.sort((a, b) => {
          return a.created > b.created ? -1 : 1;
        });
        return data;
      })
    )
  }

  getUserEvents(): Observable<UserEvent[]> {
    return this._userEvents;
  }

  getUserEventsForDevice(id: number) {
    return this.getUserEvents().pipe(
      map((events: UserEvent[]) => events.filter(event => event.deviceId === +id)!)
    );
  }

  getDeviceEvents(): Observable<DeviceEvent[]> {
    return this._deviceEvents;
  }

  getDeviceEventsForDevice(id: number) {
    return this.getDeviceEvents().pipe(
      map((events: DeviceEvent[]) => events.filter(event => event.deviceId === +id)!)
    );
  }
}
