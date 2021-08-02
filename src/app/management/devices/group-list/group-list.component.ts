// TODO: How devices are added to the group?

import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DeviceGroup } from '~local/types'
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from '~local/services/device.service';
import { ProfileService } from '~local/services/profile.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  groups$!: Observable<DeviceGroup[]>;

  constructor(
    private deviceService: DeviceService,
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) {}

  getDevices(groupId) {
    return this.deviceService.getDevicesByGroup(groupId);
  }

  getProfile(groupId) {
    return this.profileService.getProfile(groupId);
  }

  ngOnInit() {
    this.groups$ = this.deviceService.getGroups();
  }

}
