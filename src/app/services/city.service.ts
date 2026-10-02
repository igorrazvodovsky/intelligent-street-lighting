import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { City, CityData } from '../types';
import { DAUGAVPILS } from '~local/../assets/data/daugavpils';
import { SOLNA } from '~local/../assets/data/solna';

export const CITIES: City[] = [
  { id: 'daugavpils', name: 'Daugavpils', country: 'Latvia', language: 'Latvian', centerLat: 55.875, centerLng: 26.53, timeZone: 'Europe/Riga', address: 'Rīgas iela 1, Daugavpils, LV-5401, Latvia' },
  { id: 'solna', name: 'Solna', country: 'Sweden', language: 'Swedish', centerLat: 59.363, centerLng: 18.00, timeZone: 'Europe/Stockholm', address: 'Solna torg 1, 171 45 Solna, Sweden' },
];

// Each city's fixtures, by city id. Adding a city means a folder under
// src/assets/data/, an entry in CITIES and an entry here.
const CITY_DATA: { [cityId: string]: CityData } = {
  'daugavpils': DAUGAVPILS,
  'solna': SOLNA,
};

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

  // One fixture of the active city, following city switches. A city without
  // fixtures falls back to the default city's.
  data<K extends keyof CityData>(key: K): Observable<CityData[K]> {
    return this.activeCity$.pipe(
      map(city => (CITY_DATA[city.id] ?? CITY_DATA[DEFAULT_CITY_ID])[key]),
      shareReplay(1)
    );
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
