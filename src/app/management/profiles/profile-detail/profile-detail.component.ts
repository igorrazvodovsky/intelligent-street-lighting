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
  groups$!: Observable<DeviceGroup[]>;

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
  }
}




