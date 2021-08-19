import { Component, OnInit } from '@angular/core';
import { DeviceGroup } from '~local/types'
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DeviceService } from '~local/services/device.service'

@Component({
  selector: 'profile-device-list',
  templateUrl: './profile-device-list.component.html',
  styleUrls: ['./profile-device-list.component.scss']
})
export class ProfileDeviceListComponent implements OnInit {
  groups$!: Observable<DeviceGroup[]>;

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService,
  ) {}

  getDevices(groupId) {
    return this.deviceService.getDevicesByGroup(groupId);
  }

  ngOnInit() {
    this.groups$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.deviceService.getGroupsByProfile(params.get('id')!);
      })
    )
  }

}



