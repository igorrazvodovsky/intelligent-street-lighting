import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
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
    this.deviceService.getDeviceWithGroup(this.event.deviceId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(found => {
      this.device = found?.device ?? null;
      this.group = found?.group ?? null;
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
