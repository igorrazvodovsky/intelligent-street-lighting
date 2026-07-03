import { Injectable } from '@angular/core';
import { DEVICE_EVENTS as DAUGAVPILS_DEVICE_EVENTS, USER_EVENTS as DAUGAVPILS_USER_EVENTS } from '~local/../assets/data/daugavpils/events';
import { DEVICE_EVENTS as SOLNA_DEVICE_EVENTS, USER_EVENTS as SOLNA_USER_EVENTS } from '~local/../assets/data/solna/events';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators'
import { UserEvent, DeviceEvent } from '~local/types'
import { DeviceService } from './device.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private cityDeviceEventsMap: { [key: string]: DeviceEvent[] } = {
    'daugavpils': DAUGAVPILS_DEVICE_EVENTS,
    'solna': SOLNA_DEVICE_EVENTS,
  };

  private cityUserEventsMap: { [key: string]: UserEvent[] } = {
    'daugavpils': DAUGAVPILS_USER_EVENTS,
    'solna': SOLNA_USER_EVENTS,
  };

  constructor(private deviceService: DeviceService) { }

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
    return this.deviceService.activeCity$.pipe(
      map(city => this.cityUserEventsMap[city.id] ?? SOLNA_USER_EVENTS)
    );
  }

  getUserEventsForDevice(id: number) {
    return this.getUserEvents().pipe(
      map((events: UserEvent[]) => events.filter(event => event.deviceId === +id)!)
    );
  }

  getDeviceEvents(): Observable<DeviceEvent[]> {
    return this.deviceService.activeCity$.pipe(
      map(city => this.cityDeviceEventsMap[city.id] ?? SOLNA_DEVICE_EVENTS)
    );
  }

  getDeviceEventsForDevice(id: number) {
    return this.getDeviceEvents().pipe(
      map((events: DeviceEvent[]) => events.filter(event => event.deviceId === +id)!)
    );
  }
}
