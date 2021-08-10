import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { SelectivePreloadingStrategyService } from '~local/selective-preloading-strategy.service';
import { DeviceService } from '~local/services/device.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sessionId: Observable<string>;
  token: Observable<string>;
  modules: string[];
  city: string;
  number: number;
  tweenedNumber: number;

  constructor(
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    preloadStrategy: SelectivePreloadingStrategyService,
    private deviceService: DeviceService,
  ) {
    this.modules = preloadStrategy.preloadedModules;
  }

  ngOnInit() {
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
}
