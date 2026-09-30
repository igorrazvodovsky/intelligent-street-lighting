import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { City, DeviceGroup } from '~local/types';
import { CityService } from '~local/services/city.service';
import { DeviceService } from '~local/services/device.service';

// How many of the nearest groups to offer
const NEARBY = 3;

@Component({
  selector: 'initialisation-location',
  templateUrl: './initialisation-location.component.html',
  styleUrls: ['./initialisation-location.component.scss']
})
export class InitialisationLocationComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  city: City
  nearbyGroups: DeviceGroup[] = []
  group: number | 'none' | 'new' = 'none'

  constructor(private cityService: CityService, private deviceService: DeviceService) { }

  // The installer stands at the city centre. Groups have no position of their
  // own, so rank them by how close their devices are on average.
  ngOnInit(): void {
    combineLatest([this.cityService.activeCity$, this.deviceService.Devices, this.deviceService.Groups])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([city, devices, groups]) => {
        this.city = city;
        const lngScale = Math.cos(city.centerLat * Math.PI / 180);
        const distance = (group: DeviceGroup) => {
          const members = devices.filter(device => device.groupId === group.id && device.lat != null);
          if (!members.length) return Infinity;
          const lat = members.reduce((sum, d) => sum + d.lat, 0) / members.length;
          const lng = members.reduce((sum, d) => sum + d.lng, 0) / members.length;
          return Math.hypot(lat - city.centerLat, (lng - city.centerLng) * lngScale);
        };
        this.nearbyGroups = groups
          .map(group => ({ group, distance: distance(group) }))
          .filter(g => g.distance < Infinity)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, NEARBY)
          .map(g => g.group);
        this.group = this.nearbyGroups[0]?.id ?? 'none';
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
