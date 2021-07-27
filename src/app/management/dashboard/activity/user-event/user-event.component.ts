import { Component, OnInit, Input } from '@angular/core';
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
    this.deviceService.getDevice(this.event.deviceId)
      .subscribe(device => {
        this.device = device;
        this.getGroup(device.groupId).subscribe(group => {
          this.group = group
        })
      });
    this.userService.getUser(this.event.userId)
      .subscribe(user => {
        this.user = user
      });
  }

  getGroup(id) {
    return this.deviceService.getGroup(id);
  }
}
