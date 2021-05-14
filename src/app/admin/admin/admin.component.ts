import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
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
  };
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
