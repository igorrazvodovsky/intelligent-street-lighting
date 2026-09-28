// TODO: Remove?

import { Component } from '@angular/core';
import { CityService } from '~local/services/city.service';

@Component({
  selector: 'app-orgs',
  templateUrl: './orgs.component.html'
})
export class OrgsComponent {
  cities = this.cityService.cities

  constructor(private cityService: CityService) { }

}
