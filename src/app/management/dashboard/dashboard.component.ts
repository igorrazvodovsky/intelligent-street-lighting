import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppStateService } from '~local/services/app-state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sessionId: Observable<string>;
  token: Observable<string>;
  // Tabs instead of a single scrolling page
  isNarrow$ = this.appStateService.isNarrow$;

  constructor(
    private route: ActivatedRoute,
    private appStateService: AppStateService,
  ) {
  }

  ngOnInit() {
    this.sessionId = this.route
      .queryParamMap
      .pipe(map(params => params.get('session_id') || 'None'));

    this.token = this.route
      .fragment
      .pipe(map(fragment => fragment || 'None'));
  }
}
