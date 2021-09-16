import { Component, OnInit } from '@angular/core';
import { AuthService } from '~local/auth/auth.service';
import { Router } from '@angular/router';
import { AppStateService } from '~local/services/app-state.service'
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-profile-menu',
  templateUrl: './user-profile-menu.component.html'
})
export class UserProfileMenuComponent implements OnInit {
  isHandset: boolean
  @Output() navClose = new EventEmitter<void>();

  constructor(
    public router: Router,
    public authService: AuthService,
    private appStateService: AppStateService
  ) { };

  ngOnInit(): void {
    this.appStateService.isHandset.subscribe(value =>
      this.isHandset = value
    );
  }

  closeNav() {
    this.navClose.emit()
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
