import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Device, DeviceGroup, Profile, DeviceFilters, DEVICE_TYPE_LABELS } from '~local/types'
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from '~local/services/device.service';
import { ProfileService } from '~local/services/profile.service';
import { childGroups, lamps, segmentController } from '~local/services/device-tree';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DeviceListEditActionsComponent } from './device-list-edit-actions/device-list-edit-actions.component'

interface DeviceRow {
  device: Device
  // Secondary line: model for a controller, otherwise its controller and extras
  detail: string
}

@Component({
  selector: 'device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent {
  // Null on the root list, which shows top-level groups only
  groupId$: Observable<number | null> = this.route.paramMap.pipe(
    map(params => params.has('groupId') ? +params.get('groupId') : null)
  );

  // Undefined on the root list, or for a group id from the other city
  group$: Observable<DeviceGroup | undefined> = this.groupId$.pipe(
    switchMap(id => this.deviceService.getGroup(id))
  );

  devices$: Observable<Device[]> = this.groupId$.pipe(
    switchMap(id => this.deviceService.getDevicesByGroup(id))
  );

  filters$ = new BehaviorSubject<DeviceFilters>({
    type: null,
    status: null
  })

  rows$: Observable<DeviceRow[]> = combineLatest([
    this.devices$,
    this.filters$,
    this.deviceService.Devices,
    this.deviceService.Groups,
  ]).pipe(
    map(([shown, filters, devices, groups]) => shown
      .filter(device => !filters.type || device.type == filters.type)
      .filter(device => !filters.status || device.status == filters.status)
      .map(device => ({ device, detail: this.describe(device, devices, groups) })))
  );

  subgroups$: Observable<{ group: DeviceGroup, lamps: number }[]> = combineLatest([
    this.group$,
    this.deviceService.Groups,
    this.deviceService.Devices,
  ]).pipe(
    map(([group, groups, devices]) => !group ? [] : childGroups(groups, group.id)
      .map(child => ({ group: child, lamps: lamps(devices).filter(lamp => lamp.groupId === child.id).length })))
  );

  profiles$ = this.profileService.Profiles;

  // Profiles in use in the group, and child groups, each with its lamp count.
  // The group's own profile is listed even when no lamp uses it yet.
  profileUsage$: Observable<{ profile: Profile, lamps: number }[]> = combineLatest([
    this.devices$,
    this.group$,
    this.profiles$,
  ]).pipe(
    map(([devices, group, profiles]) => profiles
      .map(profile => ({ profile, lamps: lamps(devices).filter(lamp => lamp.profile?.id === profile.id).length }))
      .filter(usage => usage.lamps > 0 || usage.profile.id === group?.profileId)
      .sort((a, b) => b.lamps - a.lamps))
  );

  // No group means no profile panel
  profile$: Observable<Profile | undefined> = this.group$.pipe(
    switchMap(group => group ? this.profileService.getProfile(group.profileId) : of(undefined))
  );

  isEditable: boolean = false;
  selectedDevices: string[] = [];

  lampMapping: { [k: string]: string } = { '=1': '1 lamp', 'other': '# lamps' };

  deviceTypeMap = DEVICE_TYPE_LABELS

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

  trackByDeviceId(_index: number, row: DeviceRow) {
    return row.device.id;
  }

  private describe(device: Device, devices: Device[], groups: DeviceGroup[]): string {
    if (device.type === 'sc') return device.model
    const controller = segmentController(device, devices, groups)
    return [
      controller?.name,
      device.surgeProtector ? 'surge protector' : null,
      ...(device.sensors ?? []),
    ].filter(Boolean).join(', ')
  }
}
