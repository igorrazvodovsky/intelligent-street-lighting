import { Component, OnInit } from '@angular/core';
import { UserEvent, DeviceEvent } from '~local/types'
import { EventService } from '~local/services/event.service';
import { DeviceService } from '~local/services/device.service';
import { UserService } from '~local/services/user.service';

@Component({
  selector: 'activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  events: UserEvent[] | DeviceEvent[] = [];
  now = new Date();
  constructor(private eventService: EventService, private deviceService: DeviceService, private userService: UserService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.eventService.getEvents()
      .subscribe(events => this.events = events);
  }

  getDevice(id) {
    return this.deviceService.getDevice(id)
  }

  getUser(id) {
    return this.userService.getUser(id)
  }
}
