import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { filter, tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserEvent, User, Device, DeviceGroup } from '~local/types'
import { DeviceService } from '~local/services/device.service';
import { UserService } from '~local/services/user.service';

@Component({
  selector: 'user-event',
  templateUrl: './user-event.component.html',
  styleUrls: ['./user-event.component.scss']
})
export class UserEventComponent implements OnInit, OnDestroy {
  @Input() event: UserEvent;
  device: Device;
  group: DeviceGroup;
  user: User;
  now = new Date();
  private destroy$ = new Subject<void>();

  constructor(private deviceService: DeviceService, private userService: UserService) { }

  ngOnInit(): void {
    this.deviceService.getDevice(this.event.deviceId).pipe(
      tap((d: Device | undefined) => { if (!d) { this.device = null; this.group = null; } }),
      filter((d: Device | undefined): d is Device => !!d),
      takeUntil(this.destroy$)
    ).subscribe(device => {
        this.device = device;
        this.deviceService.getGroup(device.groupId).pipe(
          filter((g: DeviceGroup | undefined): g is DeviceGroup => !!g),
          takeUntil(this.destroy$)
        ).subscribe(group => {
          this.group = group
        })
      });
    this.userService.getUser(this.event.userId).pipe(
      filter((u: User | undefined): u is User => !!u),
      takeUntil(this.destroy$)
    ).subscribe(user => {
        this.user = user
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
