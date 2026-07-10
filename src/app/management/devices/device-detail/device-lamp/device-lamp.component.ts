import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Device, DeviceGroup, Profile } from '~local/types'
import { ProfileService } from '~local/services/profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'device-lamp',
  templateUrl: './device-lamp.component.html',
  styleUrls: ['./device-lamp.component.scss']
})
export class DeviceLampComponent implements OnInit, OnDestroy {
  @Input() device!: Device;
  @Input() group!: DeviceGroup;
  on = true;
  profiles: Profile[]
  profile: Profile
  manualMode: boolean = false
  private destroy$ = new Subject<void>();

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.Profiles.pipe(takeUntil(this.destroy$)).subscribe(profiles => {
      this.profiles = profiles
      this.profile = profiles.find(p => p.id == +this.device.profile.id)!
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onProfileSelectClick(event) {
    event.stopPropagation();
  }
}
