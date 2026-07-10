import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppStateService } from '~local/services/app-state.service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  isHandset: boolean;
  private destroy$ = new Subject<void>();

  primaryNavItems = [
    {
      label: 'Dashboard',
      route: './',
      icon: 'dashboardBold'
    },
    {
      label: 'Devices',
      route: './devices',
      icon: 'planetBold'
    },
    {
      label: 'Profiles',
      route: './profiles',
      icon: 'profileBold'
    },
    {
      label: 'Report',
      route: './reports',
      icon: 'chartBold'
    }
  ];

  constructor(
    private appStateService: AppStateService
  ) { };

  ngOnInit() {
    this.appStateService.isHandset.pipe(takeUntil(this.destroy$)).subscribe(value =>
      this.isHandset = value
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
