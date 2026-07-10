import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '~local/auth/auth.service';
import { Router } from '@angular/router';
import { AppStateService } from '~local/services/app-state.service'
import { Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile-menu',
  templateUrl: './user-profile-menu.component.html'
})
export class UserProfileMenuComponent implements OnInit, OnDestroy {
  isHandset: boolean
  @Output() navClose = new EventEmitter<void>();
  private destroy$ = new Subject<void>();

  constructor(
    public router: Router,
    public authService: AuthService,
    private appStateService: AppStateService
  ) { };

  ngOnInit(): void {
    this.appStateService.isHandset.pipe(takeUntil(this.destroy$)).subscribe(value =>
      this.isHandset = value
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  closeNav() {
    this.navClose.emit()
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
