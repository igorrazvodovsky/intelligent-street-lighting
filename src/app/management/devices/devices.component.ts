import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  deviceId: string;
  groupId: string;
  private childParamSubscription: Subscription;

  opened: boolean;
  maximized: boolean = false;
  isHandset: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
  ) {
    // TODO: Not updated on route change
    this.childParamSubscription = route.firstChild.paramMap.subscribe(
      (params: ParamMap): void => {
        this.deviceId = params.get("deviceId");
        this.groupId = params.get('groupId');
      }
    );
  }

  ngOnInit() {
    this.isHandset$.subscribe(value =>
      this.isHandset = value
    );
  }

  // TODO: Unsubscribe in other places too
  public ngOnDestroy(): void {
    this.childParamSubscription.unsubscribe();
  }

  public toggleMaximize() {
    this.maximized = !this.maximized
  }
}
