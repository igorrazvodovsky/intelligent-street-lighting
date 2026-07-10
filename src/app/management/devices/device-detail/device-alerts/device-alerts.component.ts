import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DeviceEvent } from '~local/types'
import { EventService } from '~local/services/event.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'device-alerts',
  templateUrl: './device-alerts.component.html',
  styleUrls: ['./device-alerts.component.scss']
})
export class DeviceAlertsComponent implements OnInit, OnDestroy {
  @Input() deviceId: number;
  alerts: DeviceEvent[] = [];
  private destroy$ = new Subject<void>();

  constructor(private service: EventService) { }

  ngOnInit() {
    this.getEvents();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getEvents(): void {
    this.service.getDeviceEventsForDevice(this.deviceId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(events => this.alerts = events.filter(event => event.level == 'critical' && !event.taskId)
      );
  }

}
