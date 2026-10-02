import { Component } from '@angular/core';
import { AuthService } from '~local/auth/auth.service';
import { Router } from '@angular/router';
import { AppStateService } from '~local/services/app-state.service'
import { CITIES } from '~local/services/city.service'
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-profile-menu',
  templateUrl: './user-profile-menu.component.html'
})
export class UserProfileMenuComponent {
  isHandset$ = this.appStateService.isHandset$
  // English plus the language of each city the prototype has data for
  languages = ['English', ...Array.from(new Set(CITIES.map(city => city.language)))]
  @Output() navClose = new EventEmitter<void>();

  constructor(
    public router: Router,
    public authService: AuthService,
    private appStateService: AppStateService
  ) { };

  closeNav() {
    this.navClose.emit()
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
