// TODO: Get user name

import { Component, OnInit, Input } from '@angular/core';
import { UserEvent } from '~local/types'
import { EventService } from '~local/services/event.service';
import { UserService } from '~local/services/user.service';

@Component({
  selector: 'device-history',
  templateUrl: './device-history.component.html',
  styleUrls: ['./device-history.component.scss']
})
export class DeviceHistoryComponent implements OnInit {
  @Input() id!: number;
  events: UserEvent[] = [];

  constructor(private eventService: EventService, private userService: UserService) { }

  getEvents(): void {
    this.eventService.getUserEventsForDevice(this.id)
      .subscribe(events => {
        this.events = events
      });
  }

  ngOnInit() {
    this.getEvents();
  }

}
