import { Component, OnInit, OnDestroy } from '@angular/core';
import { Profile, DeviceGroup } from '~local/types'
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProfileService } from '~local/services/profile.service'
import { DeviceService } from '~local/services/device.service'

@Component({
  selector: 'profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  profile$!: Observable<Profile>;
  profile: Profile;
  groups$!: Observable<DeviceGroup[]>;
  active: 'always' | 'date' | 'range' = 'always';
  previewMidnight: boolean = true
  private destroy$ = new Subject<void>();

  // I'm assuming here that brightness should rise and fall with an hour of a change
  // Here I'm mocking it with additional points but it depends on the implementation
  // For the visualisation the same effect can be achived with custom curves
  data = [
    {
      "static": 30,
      "dynamic": 30,
      "date": new Date(null, null, 2, 0)
    },
    {
      "static": 30,
      "dynamic": 20,
      "date": new Date(null, null, 2, 1)
    },
    {
      "static": 30,
      "dynamic": 10,
      "date": new Date(null, null, 2, 3)
    },
    // indicates the starting point for interpolation. Should not be set manually
    {
      "static": 30,
      "dynamic": 10,
      "date": new Date(null, null, 2, 5)
    },
    //
    {
      "static": 40,
      "dynamic": 20,
      "date": new Date(null, null, 2, 6)
    },
    {
      "static": 50,
      "dynamic": 30,
      "date": new Date(null, null, 2, 7)
    },
    // indicates the starting point for interpolation. Should not be set manually
    {
      "static": 50,
      "dynamic": 30,
      "date": new Date(null, null, 2, 8)
    },
    //
    {
      "static": 0,
      "dynamic": 0,
      "date": new Date(null, null, 2, 9)
    },
    // indicates the starting point for interpolation. Should not be set manually
    {
      "static": 0,
      "dynamic": 0,
      "date": new Date(null, null, 1, 20)
    },
    //
    {
      "static": 40,
      "dynamic": 30,
      "date": new Date(null, null, 1, 21)
    },
    // indicates the starting point for interpolation. Should not be set manually
    {
      "static": 40,
      "dynamic": 30,
      "date": new Date(null, null, 1, 22)
    },
    //
    {
      "static": 30,
      "dynamic": 30,
      "date": new Date(null, null, 1, 23, 0)
    },
    {
      "static": 30,
      "dynamic": 30,
      "date": new Date(null, null, 2, 0, 0)
    }
  ]


  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private deviceService: DeviceService,
  ) { }

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
    this.profile$.pipe(takeUntil(this.destroy$)).subscribe(profile => this.profile = profile)
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}




