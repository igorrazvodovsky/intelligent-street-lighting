// TODO: How devices are added to the group?

import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DeviceGroup } from '~local/types'
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from '~local/services/device.service';
import { ProfileService } from '~local/services/profile.service';

@Component({
  selector: 'group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  groups$!: Observable<DeviceGroup[]>
  groups!: DeviceGroup[]

  constructor(
    private deviceService: DeviceService,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.groups$ = this.deviceService.getGroupsByParent(null);
    this.groups$.subscribe(groups => this.groups = groups)
    // this.deviceService.groups.subscribe(groups => {
    //   this.groups = groups;
    // });
  }


}
