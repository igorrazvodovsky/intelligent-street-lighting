import { Component, OnInit, Input } from '@angular/core';
import { filter, tap } from 'rxjs/operators';
import { UserEvent, User, Device, DeviceGroup } from '~local/types'
import { DeviceService } from '~local/services/device.service';
import { UserService } from '~local/services/user.service';

@Component({
  selector: 'user-event',
  templateUrl: './user-event.component.html',
  styleUrls: ['./user-event.component.scss']
})
export class UserEventComponent implements OnInit {
  @Input() event: UserEvent;
  device: Device;
  group: DeviceGroup;
  user: User;
  now = new Date();

  constructor(private deviceService: DeviceService, private userService: UserService) { }

  ngOnInit(): void {
    this.deviceService.getDevice(this.event.deviceId).pipe(
      tap((d: Device | undefined) => { if (!d) { this.device = null; this.group = null; } }),
      filter((d: Device | undefined): d is Device => !!d)
    ).subscribe(device => {
        this.device = device;
        this.deviceService.getGroup(device.groupId).pipe(
          filter((g: DeviceGroup | undefined): g is DeviceGroup => !!g)
        ).subscribe(group => {
          this.group = group
        })
      });
    this.userService.getUser(this.event.userId).pipe(
      filter((u: User | undefined): u is User => !!u)
    ).subscribe(user => {
        this.user = user
      });
  }

}
