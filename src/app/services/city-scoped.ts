import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { City } from '../types';
import { DEFAULT_CITY_ID } from './city.service';

// Shared by services and components that key a fixture lookup table off the
// active city, so each one doesn't reimplement the same map+shareReplay pipeline.
// A city missing from the table falls back to the default city's entry.
export function cityScoped<T>(activeCity$: Observable<City>, cityMap: { [key: string]: T }): Observable<T> {
  return activeCity$.pipe(
    map(city => cityMap[city.id] ?? cityMap[DEFAULT_CITY_ID]),
    shareReplay(1)
  );
}
