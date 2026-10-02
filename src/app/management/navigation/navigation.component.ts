import { Component } from '@angular/core';
import { AppStateService } from '~local/services/app-state.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  isHandset$ = this.appStateService.isHandset$;

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
}
