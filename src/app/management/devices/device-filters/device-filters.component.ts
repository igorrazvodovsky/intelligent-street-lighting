// 1. Get devices types available for the current selection
// 2. Get devices statuses
// 3. Get profiles

import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ProfileService } from '~local/services/profile.service'
import { DeviceService } from '~local/services/device.service'
import { Profile, Device, DeviceType, DeviceStatus, DeviceFilters } from '~local/types'
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'device-filters',
  templateUrl: './device-filters.component.html',
  styleUrls: ['./device-filters.component.scss']
})
export class DeviceFiltersComponent implements OnInit, OnDestroy {
  profiles: Profile[];
  types: DeviceType[] = ['lamp', 'sc', 'sensor'];
  statuses: DeviceStatus[] = ['active', 'inactive', 'off', 'not responding', 'no power', 'alarm', 'unassigned', 'error', 'warning'];
  private destroy$ = new Subject<void>();
  // Segment controllers in the active city
  controllers$: Observable<Device[]> = this.deviceService.Devices.pipe(
    map(devices => devices.filter(device => device.type === 'sc'))
  );
  // What a street is lit for, the same in every city
  functions = ['Main road', 'Residential street', 'Pedestrian crossing', 'Cycle path', 'Park'];

  @Input() selected$: BehaviorSubject<DeviceFilters>
  selected: DeviceFilters

  @Output() filterUpdateEvent = new EventEmitter<DeviceFilters>();

  typeMap: any = { 'lamp': 'Lamps', 'sc': 'Segment controllers', 'sensor': 'Sensors' }
  statusMap: any = {
    'active': 'Active',
    'inactive': 'Inactive',
    'off': 'Off',
    'not responding': 'Not responding',
    'no power': 'No power',
    'alarm': 'Alarm',
    'unassigned': 'Unassigned',
    'error': 'Error',
    'warning': 'Warning'
  }

  constructor(private profileService: ProfileService, private deviceService: DeviceService) { }

  ngOnInit() {
    this.selected$.pipe(takeUntil(this.destroy$)).subscribe(filters => this.selected = filters)

    this.profileService.Profiles.pipe(takeUntil(this.destroy$)).subscribe(profiles => {
      this.profiles = profiles
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateType(value: DeviceType) {
    this.filterUpdateEvent.emit({ ...this.selected, type: value });
  }

  updateStatus(value: DeviceStatus) {
    this.filterUpdateEvent.emit({ ...this.selected, status: value });
  }
}
