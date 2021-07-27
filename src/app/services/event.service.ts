import { Injectable } from '@angular/core';
import { DEVICE_EVENTS, USER_EVENTS } from '../../assets/data/events';
import { Observable, of, zip } from 'rxjs';
import { map } from 'rxjs/operators'
import { UserEvent } from '~local/types'

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor() { }

  getUserEventsForDevice(id: number) {
    return this.getUserEvents().pipe(
      map((events: UserEvent[]) => events.filter(event => event.deviceId === +id)!)
    );
  }

  getUserEvents(): Observable<UserEvent[]> {
    const users = of(USER_EVENTS);
    return users;
  }

  getEvents(): Observable<any[]> {
    const events = zip(
      of(DEVICE_EVENTS),
      of(USER_EVENTS)
    ).pipe(
      map(x => x.flat()),
      map((data) => {
        data.sort((a, b) => {
          return a.created > b.created ? -1 : 1;
        });
        return data;
      })
    )
    return events;
  }
}
