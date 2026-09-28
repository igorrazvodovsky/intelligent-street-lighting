import { Component, Input, OnChanges } from '@angular/core';
import { Device, DeviceGroup, Profile } from '~local/types';
import { DeviceService } from '~local/services/device.service';
import { ProfileService } from '~local/services/profile.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Segment {
  name: string
  lamps: number
  profile?: string
}

@Component({
  selector: 'sc-connected-devices',
  templateUrl: './sc-connected-devices.component.html',
  styleUrls: ['./sc-connected-devices.component.scss']
})
export class ScConnectedDevicesComponent implements OnChanges {
  @Input() device: Device;
  segments$: Observable<Segment[]>;

  constructor(private deviceService: DeviceService, private profileService: ProfileService) { }

  // The controller drives the lamps in its own group and that group's child groups
  ngOnChanges(): void {
    this.segments$ = combineLatest([
      this.deviceService.Devices,
      this.deviceService.Groups,
      this.profileService.Profiles,
    ]).pipe(
      map(([devices, groups, profiles]) => {
        const lamps = devices.filter(device => device.type === 'lamp');
        const toSegment = (group: DeviceGroup): Segment => ({
          name: group.name,
          lamps: lamps.filter(lamp => lamp.groupId === group.id).length,
          profile: profiles.find((profile: Profile) => profile.id === group.profileId)?.name,
        });
        const own = groups.find(group => group.id === this.device.groupId);
        if (!own) return [];
        const children = groups.filter(group => group.parentId === own.id);
        return [own, ...children].map(toSegment).filter(segment => segment.lamps > 0);
      })
    );
  }

}
