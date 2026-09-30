import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Device, Profile } from '~local/types'
import { ProfileService } from '~local/services/profile.service';

@Component({
  selector: 'device-sc',
  templateUrl: './device-sc.component.html',
  styleUrls: ['./device-sc.component.scss']
})
export class DeviceScComponent implements OnInit {
  @Input() device!: Device;
  on = true
  powerlines = true
  profiles$: Observable<Profile[]> = this.profileService.Profiles

  // Relays aren't in the fixtures, so every controller shows these four
  relays = [
    {
      name: "RO1",
      profileId: 1,
      comment: "Disable the light sensor and activate the power lines",
      settings: {
        on: true,
        manual: false,
        inverted: false
      }
    },
        {
      name: "RO2",
      profileId: 1,
      comment: "Disable the power on contactor 1.",
      settings: {
        on: true,
        manual: true,
        inverted: false
      }
    },
            {
      name: "RO3",
      profileId: 1,
      comment: "",
      settings: {
        on: true,
        manual: false,
        inverted: false
      }
    },
                {
      name: "RO4",
      profileId: 1,
      comment: "",
      settings: {
        on: false,
        manual: false,
        inverted: true
      }
    }

]

  // keyvalue sorts by key unless given a comparator; keep the declared order
  keepOrder = () => 0

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
  }

}
