import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  devices: string = '/assets/data/devices.geojson';

  constructor(
    private http: HttpClient,
    private popupService: PopupService
  ) { }

  static scaledRadius(val: number, maxVal: number): number {
    return 5 + 10 * (val / maxVal);
  }

  getMarkers() {
    return this.http.get(this.devices)
  }

  // makeMarkers() {
  //   this.http.get(this.devices).subscribe((res: any) => {
  //     let markers = []
  //     for (const c of res.features) {
  //       const lon = c.geometry.coordinates[0];
  //       const lat = c.geometry.coordinates[1];
  //       const circle = L.circleMarker([lat, lon], { radius: 5 });
  //       circle.bindPopup(this.popupService.makeDevicePopup(c.properties));
  //       markers.push(circle);
  //     }
  //     return markers
  //   });
  // }
}
