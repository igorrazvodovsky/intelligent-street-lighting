import { GROUPS as DAUGAVPILS_GROUPS, MEASUREMENTS as DAUGAVPILS_MEASUREMENTS } from '~local/../assets/data/devices';
import { GROUPS as SOLNA_GROUPS, MEASUREMENTS as SOLNA_MEASUREMENTS } from '~local/../assets/data/solna/devices';
import { DEVICE_METRICS } from '~local/../assets/data/device-metrics'

import { Injectable } from '@angular/core';
import { Device, DeviceGroup, DeviceMetrics, MeasurementGroup, City } from '../types';
import { MessageService } from './message.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DeviceService {
  cities: City[] = [
    { id: 'daugavpils', name: 'Daugavpils', country: 'Latvia', centerLat: 55.875, centerLng: 26.53 },
    { id: 'solna', name: 'Solna', country: 'Sweden', centerLat: 59.363, centerLng: 18.00 },
  ];

  activeCity$ = new BehaviorSubject<City>(this.cities[1]);

  get city(): City {
    return this.activeCity$.value;
  }

  setCity(cityId: string) {
    const city = this.cities.find(c => c.id === cityId);
    if (city) {
      this.activeCity$.next(city);
    }
  }

  private cityGroupsMap: { [key: string]: DeviceGroup[] } = {
    'daugavpils': DAUGAVPILS_GROUPS,
    'solna': SOLNA_GROUPS,
  };

  private cityMeasurementsMap: { [key: string]: MeasurementGroup[] } = {
    'daugavpils': DAUGAVPILS_MEASUREMENTS,
    'solna': SOLNA_MEASUREMENTS,
  };

  private _devices = this.activeCity$.pipe(
    switchMap(city =>
      this.http.get(`/assets/data/${city.id}/devices.geojson`).pipe(
        map((data: any) => data.features.map(e => e.properties))
      )
    ),
    shareReplay(1)
  )

  private _groups = this.activeCity$.pipe(
    map(city => this.cityGroupsMap[city.id] || DAUGAVPILS_GROUPS),
    shareReplay(1)
  )

  private _metrics = of(DEVICE_METRICS)

  private _measurements = this.activeCity$.pipe(
    map(city => this.cityMeasurementsMap[city.id] || DAUGAVPILS_MEASUREMENTS),
    shareReplay(1)
  )

  public get Devices(): Observable<Device[]> {
    return this._devices
  }

  public get Groups(): Observable<DeviceGroup[]> {
    return this._groups
  }

  public get Metrics(): Observable<DeviceMetrics> {
    return this._metrics
  }

  public get Measurements(): Observable<MeasurementGroup[]> {
    return this._measurements
  }

  constructor(private messageService: MessageService, private http: HttpClient,) { }

  getGroup(id: number | string) {
    return this._groups.pipe(
      map((groups: DeviceGroup[]) => groups.find(group => group.id == +id)!)
    );
  }

  getGroupsByProfile(id: number | string) {
    return this._groups.pipe(
      map((groups: DeviceGroup[]) => groups.filter(group => group.profileId == +id)!)
    );
  }

  getGroupsByParent(id: number | string) {
    return this._groups.pipe(
      map((groups: DeviceGroup[]) => groups.filter(group => group.parentId == id)!)
    );
  }

  getDevice(id: number | string) {
    this.messageService.add('DeviceService: fetched device ' + id)
    return this._devices.pipe(
      map((devices: Device[]) => devices.find(device => device.id == +id)!)
    );
  }

  getDevicesByGroup(id: number | string) {
    return this._devices.pipe(
      map((devices: Device[]) => devices.filter(device => device.groupId == +id)!)
    );
  }

}
