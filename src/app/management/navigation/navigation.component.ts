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
      `searchBold`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/bold/popular_search-magnifying-glass-hand-lens-b-a.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `dropdownMedium`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/medium/arrows_chevron-small-down-drop-down-expand-more-m-a.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `locationRegular`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/regular/popular_location-place-r-s.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `userRegular`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/regular/popular_user-identity-person-personal-r-s.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `messageRegular`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/regular/popular_message-r-s.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `openInNewRegular`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/regular/arrows_open-in-new-android-launch-r-a.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `lightningFill`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/fill/weather_lightning-flash-electricity-a-f.svg")
    );
  };

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
