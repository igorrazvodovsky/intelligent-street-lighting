import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { LoadingService } from './services/loading.service';
import { IconService } from './services/icon.service';
import { DateFnsConfigurationService } from 'ngx-date-fns';
import enSE from './locales/en-SE';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit {
  loading$ = this.loader.loading$;

  constructor(
    public loader: LoadingService,
    private iconService: IconService,
    private dateFnsConfig: DateFnsConfigurationService
  ) { }

  ngOnInit() {
    this.iconService.registerIcons();
    this.dateFnsConfig.setLocale(enSE);
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
