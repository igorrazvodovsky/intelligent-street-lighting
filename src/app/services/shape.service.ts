import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CityService } from './city.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {
  constructor(
    private http: HttpClient,
    private cityService: CityService,
  ) { }

  getStateShapes() {
    return this.cityService.activeCity$.pipe(
      switchMap(city =>
        this.http.get(`/assets/data/${city.id}/areas.geojson`)
      )
    );
  }
}
