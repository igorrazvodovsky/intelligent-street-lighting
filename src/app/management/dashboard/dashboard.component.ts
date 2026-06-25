import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { SelectivePreloadingStrategyService } from '~local/selective-preloading-strategy.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sessionId: Observable<string>;
  token: Observable<string>;
  isHandset: boolean;

  constructor(
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    preloadStrategy: SelectivePreloadingStrategyService,
  ) {
  }

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) this.isHandset = true
        else this.isHandset = false
      });

    this.sessionId = this.route
      .queryParamMap
      .pipe(map(params => params.get('session_id') || 'None'));

    this.token = this.route
      .fragment
      .pipe(map(fragment => fragment || 'None'));
  }
}
