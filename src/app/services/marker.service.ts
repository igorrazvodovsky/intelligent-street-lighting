import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  devices: string = '/assets/data/devices.geojson';

  constructor(private http: HttpClient) { }

  static scaledRadius(val: number, maxVal: number): number {
    return 5 + 10 * (val / maxVal);
  }

  makeCapitalMarkers(map: L.map): void {
    this.http.get(this.devices).subscribe((res: any) => {

      const maxLamps = Math.max(...res.features.map(x => x.properties.lamps), 0);

      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const circle = L.circleMarker([lat, lon], { radius: MarkerService.scaledRadius(c.properties.lamps, maxLamps) });

        circle.addTo(map);
      }
    });
  }
}
