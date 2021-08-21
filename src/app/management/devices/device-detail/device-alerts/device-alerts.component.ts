import { Component, OnInit, Input } from '@angular/core';
import { DeviceEvent } from '~local/types'
import { EventService } from '~local/services/event.service';

@Component({
  selector: 'device-alerts',
  templateUrl: './device-alerts.component.html',
  styleUrls: ['./device-alerts.component.scss']
})
export class DeviceAlertsComponent implements OnInit {
  @Input() deviceId: number;
  alerts: DeviceEvent[] = [];

  constructor(private service: EventService) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.service.getDeviceEventsForDevice(this.deviceId)
      .subscribe(events => this.alerts = events.filter(event => event.level == 'critical' && !event.taskId)
      );
  }

}
