import { DEVICE_MODELS } from '~local/../assets/data/device-models'

import { Injectable } from '@angular/core';
import { Device, DeviceGroup, DeviceMetrics, DeviceModel, MeasurementGroup } from '../types';
import { MessageService } from './message.service';
import { Observable, combineLatest, of } from 'rxjs';
import { catchError, map, switchMap, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CityService } from './city.service';

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
  // Fetched once per city and shared by the device list and the map markers.
  // A failed fetch shows an empty city rather than ending the stream, so
  // switching city still works afterwards.
  private _geoJson = this.cityService.activeCity$.pipe(
    switchMap(city =>
      this.http.get<any>(`/assets/data/${city.id}/devices.geojson`).pipe(
        catchError(error => {
          this.messageService.add(`DeviceService: couldn't load devices for ${city.id}: ${error.message}`)
          return of({ type: 'FeatureCollection', features: [] })
        })
      )
    ),
    shareReplay(1)
  )

  private _devices: Observable<Device[]> = this._geoJson.pipe(
    // GeoJSON points are [lng, lat]
    map((data: any) => data.features.map(e => ({
      ...e.properties,
      lat: e.geometry.coordinates[1],
      lng: e.geometry.coordinates[0],
    }))),
    shareReplay(1)
  )

  // The raw feature collection, for Leaflet
  public get DevicesGeoJson(): Observable<any> {
    return this._geoJson
  }

  private _groups = this.cityService.data('groups')

  private _metrics = this.cityService.data('metrics')

  private _measurements = this.cityService.data('measurements')

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

  // Models are a hardware catalogue shared by every city, so they aren't city-scoped
  private _models = of(DEVICE_MODELS)

  public get Models(): Observable<DeviceModel[]> {
    return this._models
  }

  getModel(name: string): Observable<DeviceModel | undefined> {
    return this._models.pipe(map(models => models.find(model => model.name === name)))
  }

  public get Measurements(): Observable<MeasurementGroup[]> {
    return this._measurements
  }

  constructor(private messageService: MessageService, private http: HttpClient, private cityService: CityService) { }

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

  // The device and its group, or null when the active city has no such device,
  // e.g. a URL kept from the other city
  getDeviceWithGroup(id: number | string): Observable<{ device: Device, group?: DeviceGroup } | null> {
    return combineLatest([this._devices, this._groups]).pipe(
      map(([devices, groups]) => {
        const device = devices.find(d => d.id == +id)
        if (!device) return null
        return { device, group: groups.find(g => g.id == device.groupId) }
      })
    );
  }

  // A controller drives the lamps in its own group and that group's child
  // groups, so a lamp's controller sits in its group or the parent group. Same
  // rule as the controller's Segment tab.
  getSegmentController(device: Device, devices: Device[], groups: DeviceGroup[]): Device | undefined {
    const group = groups.find(g => g.id == device.groupId)
    const controllerIn = (groupId: number) => devices.find(d => d.type === 'sc' && d.groupId == groupId)
    return controllerIn(device.groupId) ?? (group?.parentId != null ? controllerIn(group.parentId) : undefined)
  }

  getDevicesByGroup(id: number | string) {
    return this._devices.pipe(
      map((devices: Device[]) => devices.filter(device => device.groupId == +id)!)
    );
  }

}
