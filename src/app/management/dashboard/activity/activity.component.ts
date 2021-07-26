// TODO: Refactor

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
  fileredEvents: UserEvent[] | DeviceEvent[] = [];
  now = new Date();
  filter = {
    user: true,
    critical: true,
    warning: true,
    info: false
  };
  constructor(private eventService: EventService, private deviceService: DeviceService, private userService: UserService) { }

  ngOnInit() {
    this.getEvents();
  }

  filterEvents(events) {
    return events.filter(event => {
      if (event.type == 'user' && this.filter.user) return true
      else if (event.type == 'device' && event.level == 'critical' && this.filter.critical) return true
      else if (event.type == 'device' && event.level == 'warning' && this.filter.warning) return true
      else if (event.type == 'device' && event.level == 'info' && this.filter.info) return true
      else return false
    })
  }

  getEvents(): void {
    this.eventService.getEvents()
      .subscribe(events => {
        this.events = events
        this.fileredEvents = this.filterEvents(events)
      });
  }

  getDevice(id) {
    return this.deviceService.getDevice(id)
  }

  getUser(id) {
    return this.userService.getUser(id)
  }

  handleFilterChange(event, f) {
    event.stopPropagation();
    this.filter[f] = !this.filter[f];
    this.fileredEvents = this.filterEvents(this.events)
  }
}
