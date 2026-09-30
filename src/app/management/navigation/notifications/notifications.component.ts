import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Device, DeviceEvent } from '~local/types';
import { DeviceService } from '~local/services/device.service';
import { EventService } from '~local/services/event.service';

interface Notification {
  event: DeviceEvent
  device?: Device
}

// Critical and warning device events in the active city that no task covers yet
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  now = new Date();
  // Dismissed only for this session; fixtures are read-only
  private dismissed$ = new BehaviorSubject<number[]>([]);

  notifications$: Observable<Notification[]> = combineLatest([
    this.eventService.getDeviceEvents(),
    this.deviceService.Devices,
    this.dismissed$,
  ]).pipe(
    map(([events, devices, dismissed]) => events
      .filter(event => (event.level === 'critical' || event.level === 'warning') && !event.taskId && !dismissed.includes(event.id))
      .sort((a, b) => +b.created - +a.created)
      .map(event => ({ event, device: devices.find(device => device.id === event.deviceId) })))
  );

  constructor(private eventService: EventService, private deviceService: DeviceService, private router: Router) { }

  open(notification: Notification) {
    this.router.navigate(['/management/devices/device', notification.event.deviceId]);
  }

  dismiss(notification: Notification, event: MouseEvent) {
    // Keep the menu open for the rest of the list
    event.stopPropagation();
    this.dismissed$.next([...this.dismissed$.value, notification.event.id]);
  }

}
