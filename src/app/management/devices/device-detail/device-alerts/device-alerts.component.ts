import { Component, OnChanges, Input } from '@angular/core';
import { DeviceEvent } from '~local/types'
import { EventService } from '~local/services/event.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'device-alerts',
  templateUrl: './device-alerts.component.html',
  styleUrls: ['./device-alerts.component.scss']
})
export class DeviceAlertsComponent implements OnChanges {
  @Input() deviceId: number;
  alerts$: Observable<DeviceEvent[]>;

  constructor(private service: EventService) { }

  // Reused when going from one device to another of the same type
  ngOnChanges() {
    this.alerts$ = this.service.getDeviceEventsForDevice(this.deviceId).pipe(
      map(events => events.filter(event => event.level == 'critical' && !event.taskId))
    );
  }

}
