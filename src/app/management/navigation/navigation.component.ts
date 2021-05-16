import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    public router: Router,
    public authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private breakpointObserver: BreakpointObserver
  ) {
    this.matIconRegistry.addSvgIcon(
      `notificationBold`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/bold/popular_notification-bell-alert-b-s.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `userBold`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/bold/popular_user-identity-person-personal-b-s.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `planetBold`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/bold/popular_planet-earth-internet-public-b-s.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `chartBold`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/bold/interface_chart-bar-investment-equalizer-graphic-eq-b-a.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `dashboardBold`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/bold/interface_dashboard-view-dashboard-b-s.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `profileBold`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/bold/interface_preferences-settings-adjustments-filter-options-b-s.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `gearBold`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/bold/popular_gear-maintenance-preferences-settings-adjustments-options-b-s.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `dropdownMedium`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/medium/arrows_chevron-small-down-drop-down-expand-more-m-a.svg")
    );
  };

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
