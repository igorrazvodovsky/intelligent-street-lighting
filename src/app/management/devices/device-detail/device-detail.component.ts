import { Component, OnInit, OnDestroy } from '@angular/core';
import { Device, DeviceGroup } from '~local/types'
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DeviceService } from '~local/services/device.service'
import { CityService } from '~local/services/city.service'

@Component({
  selector: 'device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent implements OnInit, OnDestroy {
  device: Device;
  group: DeviceGroup;
  loaded = false;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private service: DeviceService,
    private cityService: CityService
  ) { }

  get cityName(): string {
    return this.cityService.city.name
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.service.getDeviceWithGroup(params.get('deviceId')!)),
      takeUntil(this.destroy$)
    ).subscribe(found => {
      this.loaded = true;
      this.device = found?.device;
      this.group = found?.group;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
