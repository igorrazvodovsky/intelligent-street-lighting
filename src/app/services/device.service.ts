import { GROUPS as DAUGAVPILS_GROUPS, MEASUREMENTS as DAUGAVPILS_MEASUREMENTS } from '~local/../assets/data/daugavpils/groups';
import { GROUPS as SOLNA_GROUPS, MEASUREMENTS as SOLNA_MEASUREMENTS } from '~local/../assets/data/solna/groups';
import { DEVICE_METRICS as DAUGAVPILS_METRICS } from '~local/../assets/data/daugavpils/device-metrics'
import { DEVICE_METRICS as SOLNA_METRICS } from '~local/../assets/data/solna/device-metrics'

import { Injectable } from '@angular/core';
import { Device, DeviceGroup, DeviceMetrics, MeasurementGroup, City } from '../types';
import { MessageService } from './message.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { cityScoped } from './city-scoped';

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

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

  private _groups = cityScoped(this.activeCity$, this.cityGroupsMap, DAUGAVPILS_GROUPS)

  private cityMetricsMap: { [key: string]: DeviceMetrics } = {
    'daugavpils': DAUGAVPILS_METRICS,
    'solna': SOLNA_METRICS,
  };

  private _metrics = cityScoped(this.activeCity$, this.cityMetricsMap, DAUGAVPILS_METRICS)

  private _measurements = cityScoped(this.activeCity$, this.cityMeasurementsMap, DAUGAVPILS_MEASUREMENTS)

  public get Devices(): Observable<Device[]> {
    return this._devices
  }

  public get Groups(): Observable<DeviceGroup[]> {
    return this._groups
  }

  public get Metrics(): Observable<DeviceMetrics> {
    return this._metrics
  }

  getMetrics(deviceId: number | string): Observable<DeviceMetrics> {
    return this._metrics.pipe(
      map(metrics => this.scaleMetricsForDevice(metrics, +deviceId))
    );
  }

  // Deterministic per-device jitter so each device's chart looks distinct
  // but stays stable across reloads, without needing a metrics fixture per device.
  private scaleMetricsForDevice(metrics: DeviceMetrics, deviceId: number): DeviceMetrics {
    const random = mulberry32(deviceId);
    const factor = 0.7 + random() * 0.6; // 0.7x-1.3x
    const scaled: DeviceMetrics = {};
    for (const key of Object.keys(metrics)) {
      scaled[key] = metrics[key].map(entry => {
        const seen = Math.round(entry.seen * factor);
        const consumed = Math.min(seen, Math.round(entry.consumed * factor));
        return { ...entry, seen, consumed, conversion: seen > 0 ? +(consumed / seen * 100).toFixed(2) : 0 };
      });
    }
    return scaled;
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
