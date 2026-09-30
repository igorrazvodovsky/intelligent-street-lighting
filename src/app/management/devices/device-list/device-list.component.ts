// TODO: No sense in using Obseravle for things that won't change (group)

import { Observable, BehaviorSubject, Subject, combineLatest, of } from 'rxjs';
import { switchMap, filter, map, takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class DeviceListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  category: number = null;
  group$!: Observable<DeviceGroup>;
  devices$!: Observable<Device[]>;
  filteredDevices$: Observable<Device[]>;
  profile$!: Observable<Profile>;
  profiles!: Profile[];
  // Profiles in use in the group, and child groups, each with its lamp count
  profileUsage$!: Observable<{ profile: Profile, lamps: number }[]>;
  subgroups$!: Observable<{ group: DeviceGroup, lamps: number }[]>;
  // Secondary line of each device row, by device id
  details: { [id: number]: string } = {};

  isEditable: boolean = false;
  selectedDevices: string[] = [];

  filters$: BehaviorSubject<DeviceFilters> = new BehaviorSubject({
    type: null,
    status: null
  })

  lampMapping: { [k: string]: string } = { '=1': '1 lamp', 'other': '# lamps' };

  deviceTypeMap: any = {
    'lamp': 'Lamp',
    'sc': 'Segment controller',
    'sensor': '',
  }

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

  trackByDeviceId(_index: number, device: Device) {
    return device.id;
  }

  ngOnInit() {
    this.profileService.Profiles.pipe(takeUntil(this.destroy$)).subscribe(profiles => this.profiles = profiles);

    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
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

    const lampsIn = (devices: Device[]) => devices.filter(device => device.type === 'lamp')


    this.subgroups$ = combineLatest([this.group$, this.deviceService.Groups, this.deviceService.Devices]).pipe(
      map(([group, groups, devices]) => !group ? [] : groups
        .filter(child => child.parentId === group.id)
        .map(child => ({ group: child, lamps: lampsIn(devices).filter(lamp => lamp.groupId === child.id).length })))
    );

    combineLatest([this.devices$, this.deviceService.Devices, this.deviceService.Groups])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([shown, devices, groups]) => {
        this.details = Object.fromEntries(shown.map(device => [device.id, this.describe(device, devices, groups)]))
      });

    // The group's own profile is listed even when no lamp uses it yet
    this.profileUsage$ = combineLatest([this.devices$, this.group$, this.profileService.Profiles]).pipe(
      map(([devices, group, profiles]) => profiles
        .map(profile => ({ profile, lamps: lampsIn(devices).filter(lamp => lamp.profile?.id === profile.id).length }))
        .filter(usage => usage.lamps > 0 || usage.profile.id === group?.profileId)
        .sort((a, b) => b.lamps - a.lamps))
    );

    // No group (the root list, or a group id from the other city) means no profile panel
    this.profile$ = this.group$.pipe(
      switchMap(group => group ? this.profileService.getProfile(group.profileId) : of(undefined))
    );

  }

  private describe(device: Device, devices: Device[], groups: DeviceGroup[]): string {
    if (device.type === 'sc') return device.model
    const controller = this.deviceService.getSegmentController(device, devices, groups)
    return [
      controller?.name,
      device.surgeProtector ? 'surge protector' : null,
      ...(device.sensors ?? []),
    ].filter(Boolean).join(', ')
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

