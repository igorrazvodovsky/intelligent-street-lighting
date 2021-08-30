import { Component, OnInit, Input } from '@angular/core';
import { Device, DeviceGroup, Profile } from '~local/types'
import { ProfileService } from '~local/services/profile.service';

@Component({
  selector: 'device-lamp',
  templateUrl: './device-lamp.component.html',
  styleUrls: ['./device-lamp.component.scss']
})
export class DeviceLampComponent implements OnInit {
  @Input() device!: Device;
  @Input() group!: DeviceGroup;
  on = true;
  profiles: Profile[]
  profile: Profile

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.Profiles.subscribe(profiles => {
      this.profiles = profiles
      this.profile = profiles.find(p => p.id == +this.device.profile.id)!
    });
  }

  onProfileSelectClick(event) {
    event.stopPropagation();
  }
}
