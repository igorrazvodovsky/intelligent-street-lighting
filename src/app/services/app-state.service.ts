import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  // Phones, either way up: drawers slide over the content instead of beside it
  readonly isHandset$: Observable<boolean> = this.matches([Breakpoints.Handset]);

  // Phones held upright and small tablets: too narrow for side-by-side panels
  readonly isNarrow$: Observable<boolean> = this.matches([Breakpoints.Small, Breakpoints.HandsetPortrait]);

  constructor(private breakpointObserver: BreakpointObserver) { }

  private matches(queries: string[]): Observable<boolean> {
    return this.breakpointObserver.observe(queries).pipe(
      map(result => result.matches),
      shareReplay(1)
    );
  }
}
