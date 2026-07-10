import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { filter, tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DeviceEvent, Device, DeviceGroup } from '~local/types'
import { DeviceService } from '~local/services/device.service';

@Component({
  selector: 'device-event',
  templateUrl: './device-event.component.html',
  styleUrls: ['./device-event.component.scss']
})
export class DeviceEventComponent implements OnInit, OnDestroy {
  @Input() event: DeviceEvent;
  device: Device;
  group: DeviceGroup;
  now = new Date();
  private destroy$ = new Subject<void>();

  constructor(private service: DeviceService) { }

  ngOnInit(): void {
    this.service.getDevice(this.event.deviceId).pipe(
      tap((d: Device | undefined) => { if (!d) { this.device = null; this.group = null; } }),
      filter((d: Device | undefined): d is Device => !!d),
      takeUntil(this.destroy$)
    ).subscribe(device => {
        this.device = device;
        this.getGroup(device.groupId).pipe(
          filter((g: DeviceGroup | undefined): g is DeviceGroup => !!g),
          takeUntil(this.destroy$)
        ).subscribe(group => {
          this.group = group
        })
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getGroup(id) {
    return this.service.getGroup(id);
  }

}
