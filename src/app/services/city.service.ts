import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City } from '../types';

export const CITIES: City[] = [
  { id: 'daugavpils', name: 'Daugavpils', country: 'Latvia', language: 'Latvian', centerLat: 55.875, centerLng: 26.53, timeZone: 'Europe/Riga' },
  { id: 'solna', name: 'Solna', country: 'Sweden', language: 'Swedish', centerLat: 59.363, centerLng: 18.00, timeZone: 'Europe/Stockholm' },
];

// City shown on first visit, and the one city-scoped lookups fall back to.
export const DEFAULT_CITY_ID = 'solna';

const STORAGE_KEY = 'activeCityId';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  cities = CITIES;

  activeCity$ = new BehaviorSubject<City>(this.findCity(this.readStoredCityId()) ?? this.findCity(DEFAULT_CITY_ID)!);

  get city(): City {
    return this.activeCity$.value;
  }

  setCity(cityId: string) {
    const city = this.findCity(cityId);
    if (city) {
      this.activeCity$.next(city);
      try {
        localStorage.setItem(STORAGE_KEY, city.id);
      } catch { }
    }
  }

  private findCity(cityId: string | null): City | undefined {
    return this.cities.find(c => c.id === cityId);
  }

  private readStoredCityId(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }
}
