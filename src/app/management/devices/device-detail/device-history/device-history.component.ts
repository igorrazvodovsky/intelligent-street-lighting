import { Component, OnChanges, Input } from '@angular/core';
import { DeviceGroup } from '~local/types'
import { EventService } from '~local/services/event.service';
import { UserService } from '~local/services/user.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface HistoryEntry {
  heading: string
  created: Date
  text: string
}

@Component({
  selector: 'device-history',
  templateUrl: './device-history.component.html',
  styleUrls: ['./device-history.component.scss']
})
export class DeviceHistoryComponent implements OnChanges {
  @Input() id!: number;
  @Input() group?: DeviceGroup;
  entries$: Observable<HistoryEntry[]>;

  constructor(private eventService: EventService, private userService: UserService) { }

  // Reused when going from one device to another of the same type
  ngOnChanges() {
    this.entries$ = combineLatest([
      this.eventService.getUserEventsForDevice(this.id),
      this.eventService.getDeviceEventsForDevice(this.id),
      this.userService.Users,
    ]).pipe(
      map(([userEvents, deviceEvents, users]) => {
        const entries: HistoryEntry[] = [
          ...userEvents.map(event => ({
            heading: users.find(user => user.id === event.userId)?.name ?? 'Unknown user',
            created: event.created,
            text: `Changed ${event.property} to ${event.to}.`,
          })),
          ...deviceEvents.map(event => ({
            heading: event.title.trim(),
            created: event.created,
            text: event.description ?? `Reported by the device.`,
          })),
        ];
        entries.sort((a, b) => +b.created - +a.created);
        // A device always has at least one entry: its installation. Fixtures
        // have no install date, so use the date its group was set up.
        if (this.group) {
          entries.push({ heading: 'Installed', created: this.group.created, text: `Added to ${this.group.name}.` });
        }
        return entries;
      })
    );
  }

}
