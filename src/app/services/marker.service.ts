import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopupService } from './popup.service';
import { DeviceService } from './device.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  constructor(
    private http: HttpClient,
    private popupService: PopupService,
    private deviceService: DeviceService,
  ) { }

  static scaledRadius(val: number, maxVal: number): number {
    return 5 + 10 * (val / maxVal);
  }

  getMarkers() {
    return this.deviceService.activeCity$.pipe(
      switchMap(city =>
        this.http.get(`/assets/data/${city.id}/devices.geojson`)
      )
    );
  }
}
