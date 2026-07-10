import { Component, OnInit, OnDestroy } from '@angular/core';
import { Device, DeviceGroup } from '~local/types'
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DeviceService } from '~local/services/device.service'

@Component({
  selector: 'device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent implements OnInit, OnDestroy {
  device$!: Observable<Device>;
  device: Device;
  group: DeviceGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private service: DeviceService
  ) { }

  ngOnInit() {
    this.device$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getDevice(params.get('deviceId')!))
    );

    this.device$.pipe(takeUntil(this.destroy$)).subscribe(device => {
      this.device = device;
      this.service.getGroup(device.groupId).pipe(takeUntil(this.destroy$)).subscribe(group => this.group = group)
    }
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
