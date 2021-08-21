import { Component, OnInit } from '@angular/core';
import { ProfileService } from '~local/services/profile.service'
import { Profile } from '~local/types'

@Component({
  selector: 'device-filters',
  templateUrl: './device-filters.component.html',
  styleUrls: ['./device-filters.component.scss']
})
export class DeviceFiltersComponent implements OnInit {
  profiles: Profile[]

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.Profiles.subscribe(profiles => {
      this.profiles = profiles
    });
  }

}
