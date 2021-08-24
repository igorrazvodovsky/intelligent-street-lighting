import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '~local/auth/auth.service';
import { Router, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  modalMode = false;
  modalModeRoutes = ['/management/initialise']
  search = false;
  isHandset: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
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
    public router: Router,
    public authService: AuthService,
    private breakpointObserver: BreakpointObserver
  ) { };

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  checkRoute() {
    const url = this.router.routerState.snapshot.url
    if (this.modalModeRoutes.includes(url)) this.modalMode = true
    else this.modalMode = false
  }

  ngOnInit() {

    // Part of common toolbar items should be hidden in some views
    // TODO: Replace with something appropriate
    this.checkRoute()
    this.router.events.subscribe((event: Event) => {
      this.checkRoute()
    });

    this.isHandset$.subscribe(value =>
      this.isHandset = value
    );
  }
}
