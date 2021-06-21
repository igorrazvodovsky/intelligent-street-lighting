import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Device, DeviceGroup } from '../../../types'
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from '../../../services/device.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  group$!: Observable<DeviceGroup>;
  devices$!: Observable<Device[]>;

  constructor(
    private deviceService: DeviceService,
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.group$ = this.route.paramMap.pipe(
      switchMap((params) =>
        this.deviceService.getGroup(params.get('groupId')!))
    );
    this.devices$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.deviceService.getDevicesByGroup(params.get('groupId')!);
      })
    );
  }
}
