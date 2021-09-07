import { Component, OnInit } from '@angular/core';
import { Profile, DeviceGroup } from '~local/types'
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProfileService } from '~local/services/profile.service'
import { DeviceService } from '~local/services/device.service'

@Component({
  selector: 'profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  profile$!: Observable<Profile>;
  profile: Profile;
  groups$!: Observable<DeviceGroup[]>;
  active: 'always' | 'date' | 'range' = 'always';

  data = {
    static: [
      {
        "value": 30,
        "date": new Date(null, null , 1, 0, 0)
      },
      {
        "value": 30,
        "date": new Date(null, null , 1, 6, 0)
      },
      {
        "value": 40,
        "date": new Date(null, null , 1, 7, 0)
      },
      {
        "value": 40,
        "date": new Date(null, null , 1, 16, 0)
      },
      {
        "value": 30,
        "date": new Date(null, null , 1, 23, 0)
      },
      {
        "value": 30,
        "date": new Date(null, null , 2, 0, 0)
      },
    ],
    dynamic: [
      {
        "value": 60,
        "date": new Date(null, null , 1, 0, 0)
      },
      {
        "value": 60,
        "date": new Date(null, null , 1, 7, 0)
      },
      {
        "value": 0,
        "date": new Date(null, null , 1, 7, 1)
      },
      {
        "value": 0,
        "date": new Date(null, null , 1, 15, 59)
      },
      {
        "value": 60,
        "date": new Date(null, null , 1, 16, 0)
      },
      {
        "value": 60,
        "date": new Date(null, null , 1, 23, 0)
      },
      {
        "value": 60,
        "date": new Date(null, null , 2, 0, 0)
      },
  ]
  }

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private deviceService: DeviceService,
  ) {}

  ngOnInit() {
    this.profile$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.profileService.getProfile(params.get('id')!))
    );
    this.groups$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.deviceService.getGroupsByProfile(params.get('id')!);
      })
    );
    this.profile$.subscribe(profile => this.profile = profile)
  }
}




