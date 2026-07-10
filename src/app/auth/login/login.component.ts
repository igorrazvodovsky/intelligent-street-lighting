import { Component, OnDestroy } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoadingService } from '~local/services/loading.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  loading$ = this.loader.loading$;
  private destroy$ = new Subject<void>();

  constructor(
    public authService: AuthService,
    public router: Router,
    public loader: LoadingService,
    private http: HttpClient,
  ) {
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  login() {
    this.loader.show()

    this.authService.login().pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.authService.isLoggedIn) {
        // Usually you would use the redirect URL from the auth service.
        const redirectUrl = '/management';

        // Set our navigation extras object
        // that passes on our global query params and fragment
        const navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };

        this.loader.hide()
        this.router.navigate([redirectUrl], navigationExtras);
      }
    });
  }
}
