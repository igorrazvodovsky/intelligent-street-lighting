import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { SelectivePreloadingStrategyService } from '~local/selective-preloading-strategy.service';
import { DeviceService } from '~local/services/device.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  sessionId: Observable<string>;
  token: Observable<string>;
  city: string;
  destroyed = new Subject<void>();
  isHandset: boolean;

  constructor(
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    preloadStrategy: SelectivePreloadingStrategyService,
    private deviceService: DeviceService,
  ) {
  }

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) this.isHandset = true
        else this.isHandset = false
      });

    this.city = this.deviceService.city.name
    // Capture the session ID if available
    this.sessionId = this.route
      .queryParamMap
      .pipe(map(params => params.get('session_id') || 'None'));

    // Capture the fragment if available
    this.token = this.route
      .fragment
      .pipe(map(fragment => fragment || 'None'));
  }

    ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
