import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DeviceGroup, Device, Profile } from '~local/types';
import { DeviceService } from '~local/services/device.service';
import { ProfileService } from '~local/services/profile.service';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'group-list-item',
  templateUrl: './group-list-item.component.html',
  styleUrls: ['./group-list-item.component.scss']
})
export class GroupListItemComponent implements OnInit, OnDestroy {
  @Input() group: DeviceGroup
  devices: Device[]
  profile: Profile
  private destroy$ = new Subject<void>();

  childGroupsMapping:
    { [k: string]: string } = { '=1': '# group, ', 'other': '# groups,' };

  lampMapping:
    { [k: string]: string } = { '=0': 'empty, ', '=1': '# lamp, ', 'other': '# lamps,' };


  constructor(private deviceService: DeviceService,
    private profileService: ProfileService,) { }

  ngOnInit(): void {
    // Lamps in the group and its child groups
    combineLatest([this.deviceService.Devices, this.deviceService.Groups]).pipe(takeUntil(this.destroy$)).subscribe(([devices, groups]) => {
      const groupIds = [this.group.id, ...groups.filter(g => g.parentId === this.group.id).map(g => g.id)];
      this.devices = devices.filter(device => device.type === 'lamp' && groupIds.includes(device.groupId));
    });
    this.profileService.getProfile(this.group.profileId).pipe(takeUntil(this.destroy$)).subscribe(profile => this.profile = profile);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
