import { Component, OnInit } from '@angular/core';
import { AppStateService } from '~local/services/app-state.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  isHandset: boolean;

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
      label: 'Reports',
      route: './reports',
      icon: 'chartBold'
    }
  ];

  constructor(
    private appStateService: AppStateService
  ) { };

  ngOnInit() {
    this.appStateService.isHandset.subscribe(value =>
      this.isHandset = value
    );
  }
}
