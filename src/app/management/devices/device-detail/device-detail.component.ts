import { Component, OnInit } from '@angular/core';
import { Device, DeviceGroup } from '~local/types'
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DeviceService } from '~local/services/device.service'

@Component({
  selector: 'device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent implements OnInit {
  device$!: Observable<Device>;
  device: Device;
  group$!: Observable<DeviceGroup>;

  constructor(
    private route: ActivatedRoute,
    private service: DeviceService
  ) { }

  ngOnInit() {
    this.device$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getDevice(params.get('deviceId')!))
    );
    this.group$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getGroup(params.get('groupId')!))
    );
    this.device$.subscribe(device =>
      this.device = device
    );
  }

}
