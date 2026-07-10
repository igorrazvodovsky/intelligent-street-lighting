// TODO: Get user name

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UserEvent } from '~local/types'
import { EventService } from '~local/services/event.service';
import { UserService } from '~local/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'device-history',
  templateUrl: './device-history.component.html',
  styleUrls: ['./device-history.component.scss']
})
export class DeviceHistoryComponent implements OnInit, OnDestroy {
  @Input() id!: number;
  events: UserEvent[] = [];
  private destroy$ = new Subject<void>();

  constructor(private eventService: EventService, private userService: UserService) { }

  getEvents(): void {
    this.eventService.getUserEventsForDevice(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(events => {
        this.events = events
      });
  }

  ngOnInit() {
    this.getEvents();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
