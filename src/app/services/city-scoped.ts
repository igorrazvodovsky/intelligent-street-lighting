import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { City } from '../types';

// Shared by services that key a fixture lookup table off the active city,
// so each one doesn't reimplement the same map+shareReplay pipeline.
export function cityScoped<T>(activeCity$: Observable<City>, cityMap: { [key: string]: T }, fallback: T): Observable<T> {
  return activeCity$.pipe(
    map(city => cityMap[city.id] ?? fallback),
    shareReplay(1)
  );
}
