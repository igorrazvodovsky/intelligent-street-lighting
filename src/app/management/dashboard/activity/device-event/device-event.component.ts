import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
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
    this.service.getDeviceWithGroup(this.event.deviceId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(found => {
      this.device = found?.device ?? null;
      this.group = found?.group ?? null;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
