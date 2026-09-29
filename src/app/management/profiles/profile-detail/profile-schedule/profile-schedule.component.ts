import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Schedule, TimeGroup } from '~local/types'
import { TIME_OPTIONS } from '~local/../assets/data/profile-time-options'
import { optionToTime, sameTime, timeToOption } from '../schedule-time'

// Edits a schedule in place and emits `changed` after each edit
@Component({
  selector: 'profile-schedule',
  templateUrl: './profile-schedule.component.html',
  styleUrls: ['./profile-schedule.component.scss']
})
export class ProfileScheduleComponent implements OnChanges {
  @Input() schedule: Schedule;
  @Input() last: boolean;
  @Input() first: boolean;
  @Input() expanded = false;
  // A profile needs at least one schedule
  @Input() removable = true;
  @Output() changed = new EventEmitter<void>();
  @Output() move = new EventEmitter<-1 | 1>();
  @Output() remove = new EventEmitter<void>();
  week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  timeGroups: TimeGroup[] = []
  timeOptions = TIME_OPTIONS
  toOption = timeToOption
  percent = (value: number) => Math.round(value * 100) + '%'

  ngOnChanges(): void {
    this.groupDays();
  }

  // Groups enabled days by their times, starting with the schedule's own
  private groupDays() {
    const { time } = this.schedule;
    const groups: TimeGroup[] = [{ days: [], start: time.start, end: time.end }];
    time.week.forEach((day, i) => {
      if (!day.enabled) return;
      const start = day.start || time.start;
      const end = day.end || time.end;
      const group = groups.find(g => sameTime(g.start, start) && sameTime(g.end, end));
      if (group) group.days.push(i);
      else groups.push({ days: [i], start, end });
    });
    this.timeGroups = groups.filter(g => g.days.length);
  }

  private edited() {
    this.groupDays();
    this.changed.emit();
  }

  setBrightness(value: number | null) {
    if (value === null) return;
    this.schedule.brightness = value;
    this.edited();
  }

  setTime(key: 'start' | 'end', option: string) {
    this.schedule.time[key] = optionToTime(option);
    this.edited();
  }

  setDay(i: number, enabled: boolean) {
    this.schedule.time.week[i] = { enabled };
    this.edited();
  }

  // Picking the schedule's own time clears the day's override
  setDayTime(i: number, key: 'start' | 'end', option: string) {
    const day = this.schedule.time.week[i];
    const time = optionToTime(option);
    if (sameTime(time, this.schedule.time[key])) delete day[key];
    else day[key] = time;
    this.edited();
  }
}
