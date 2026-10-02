// TODO: Refactor

import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserEvent, DeviceEvent, Event } from '~local/types'
import { EventService } from '~local/services/event.service';

@Component({
  selector: 'activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  events: UserEvent[] | DeviceEvent[] = [];
  filteredEvents: UserEvent[] | DeviceEvent[] = [];
  filter = {
    user: true,
    critical: true,
    warning: true,
    info: true
  };
  constructor(
    private renderer: Renderer2,
    private eventService: EventService) {
      this.renderer.addClass(document.body, 'dashboard');
    }

  ngOnInit() {
    this.getEvents();
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'dashboard');
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByEventId(_index: number, event: Event) {
    return event.id;
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
      .pipe(takeUntil(this.destroy$))
      .subscribe(events => {
        this.events = events
        this.filteredEvents = this.filterEvents(events)
      });
  }

  handleFilterChange(event, f) {
    event.stopPropagation();
    this.filter[f] = !this.filter[f];
    this.filteredEvents = this.filterEvents(this.events)
  }
}
