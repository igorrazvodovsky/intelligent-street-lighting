import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { LoadingService } from './services/loading.service';
import { IconService } from './services/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit {
  loading$ = this.loader.loading$;

  constructor(public loader: LoadingService, private iconService: IconService) { }

  ngOnInit() {
    this.iconService.registerIcons();
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
