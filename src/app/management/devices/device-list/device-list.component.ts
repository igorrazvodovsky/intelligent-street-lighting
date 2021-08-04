// TODO: No sense in using Obseravle for things that won't change (group)

import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Device, DeviceGroup, Profile } from '~local/types'
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from '~local/services/device.service';
import { ProfileService } from '~local/services/profile.service';

@Component({
  selector: 'device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  group$!: Observable<DeviceGroup>;
  devices$!: Observable<Device[]>;
  profile$!: Observable<Profile>;
  profiles$!: Observable<Profile[]>;

  isEditable: boolean = false;
  selectedDevices: string[] = [];

  constructor(
    private deviceService: DeviceService,
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) { }

  onProfileSelectClick(event) {
    event.stopPropagation();
  }

  ngOnInit() {
    this.profiles$ = this.profileService.getProfiles();
    this.group$ = this.route.paramMap.pipe(
      switchMap(params =>
        this.deviceService.getGroup(params.get('groupId')!))
    );
    this.devices$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.deviceService.getDevicesByGroup(params.get('groupId')!);
      })
    );
    this.group$.subscribe(group =>
      this.profile$ = this.profileService.getProfile(group.profileId)
    );
  }
}
