import { Component, OnChanges, Input } from '@angular/core';
import { Device, DeviceGroup, Profile } from '~local/types'
import { ProfileService } from '~local/services/profile.service';
import { CityService } from '~local/services/city.service';
import { nightSun } from '~local/management/profiles/profile-detail/sun-times';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'device-lamp',
  templateUrl: './device-lamp.component.html',
  styleUrls: ['./device-lamp.component.scss']
})
export class DeviceLampComponent implements OnChanges {
  @Input() device!: Device;
  @Input() group?: DeviceGroup;
  on = true;
  profiles$: Observable<Profile[]>
  profile$: Observable<Profile | undefined>
  // A manual override holds until the next sunrise in the device's city
  sunrise$: Observable<Date>
  manualMode: boolean = false

  constructor(private profileService: ProfileService, private cityService: CityService) { }

  // Reused when going from one lamp to another
  ngOnChanges() {
    this.profiles$ = this.profileService.Profiles
    this.profile$ = this.profiles$.pipe(
      map(profiles => profiles.find(p => p.id == +this.device.profile.id))
    )
    this.sunrise$ = this.cityService.activeCity$.pipe(
      map(city => nightSun(city, new Date()).sunrise)
    )
  }

  onProfileSelectClick(event) {
    event.stopPropagation();
  }
}
