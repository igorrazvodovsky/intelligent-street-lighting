// TODO: No sense in using Obseravle for things that won't change (group)

import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, filter, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Device, DeviceGroup, Profile, DeviceStatus, DeviceType, DeviceFilters } from '~local/types'
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from '~local/services/device.service';
import { ProfileService } from '~local/services/profile.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DeviceListEditActionsComponent } from './device-list-edit-actions/device-list-edit-actions.component'

@Component({
  selector: 'device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  category: number = null;
  group$!: Observable<DeviceGroup>;
  devices$!: Observable<Device[]>;
  filteredDevices$: Observable<Device[]>;
  profile$!: Observable<Profile>;
  profiles!: Profile[];

  isEditable: boolean = false;
  selectedDevices: string[] = [];

  filters$: BehaviorSubject<DeviceFilters> = new BehaviorSubject({
    type: null,
    status: null
  })

  constructor(
    private _bottomSheet: MatBottomSheet,
    private deviceService: DeviceService,
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) { }

  openEditActions(): void {
    this.isEditable = !this.isEditable;
    this._bottomSheet.open(DeviceListEditActionsComponent, { hasBackdrop: false });
  }

  onProfileSelectClick(event) {
    event.stopPropagation();
  }

  updateFilter(update) {
    this.filters$.next(update)
  }

  ngOnInit() {
    this.profileService.Profiles.subscribe(profiles => this.profiles = profiles);

    this.route.paramMap.subscribe(params => {
      const category = params.get('groupId')
      if (category == null) this.category = null
      else this.category = +category
    })

    this.group$ = this.route.paramMap.pipe(
      switchMap(params =>
        this.deviceService.getGroup(params.get('groupId')!)),
    );

    this.devices$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.deviceService.getDevicesByGroup(params.get('groupId')!);
      })
    );

    this.filteredDevices$ = this.devices$
      .pipe(
        switchMap($devices => {
          return this.filters$.pipe(
            map($filters => {
              return $devices
                .filter($device => {
                  if ($filters.type) return $device.type == $filters.type
                  else return true
                })
                .filter(device => {
                  if ($filters.status) return device.status == $filters.status
                  else return true
                })
            }),
          )
        })
      )

    this.group$.subscribe(group =>
      this.profile$ = this.profileService.getProfile(group.profileId)
    );

  }
}

