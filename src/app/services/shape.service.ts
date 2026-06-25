import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeviceService } from './device.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {
  constructor(
    private http: HttpClient,
    private deviceService: DeviceService,
  ) { }

  getStateShapes() {
    return this.deviceService.activeCity$.pipe(
      switchMap(city =>
        this.http.get(`/assets/data/${city.id}/areas.geojson`)
      )
    );
  }
}
