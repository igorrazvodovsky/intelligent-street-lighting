import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ScheduleDynamic } from '~local/types'
import { TIME_OPTIONS } from '~local/../assets/data/profile-time-options'
import { optionToTime, sameTime, timeToOption } from '../schedule-time'

const BOOSTS = [0.1, 0.2, 0.25, 0.3, 0.33, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]

// Edits a traffic boost in place and emits `changed` after each edit
@Component({
  selector: 'profile-schedule-dynamic',
  templateUrl: './profile-schedule-dynamic.component.html',
  styleUrls: ['./profile-schedule-dynamic.component.scss']
})
export class ProfileScheduleDynamicComponent {
  @Input() schedule: ScheduleDynamic;
  @Input() first: boolean;
  @Input() last: boolean;
  @Input() expanded = false;
  @Output() changed = new EventEmitter<void>();
  @Output() move = new EventEmitter<-1 | 1>();
  @Output() remove = new EventEmitter<void>();
  timeOptions = TIME_OPTIONS
  toOption = timeToOption

  // Includes the current boost, so the select never shows blank
  get boostOptions(): number[] {
    return BOOSTS.includes(this.schedule.brightness)
      ? BOOSTS
      : [...BOOSTS, this.schedule.brightness].sort((a, b) => a - b);
  }

  // Equal start and end, as in 00:00–24:00, cover the whole night
  get wholeNight(): boolean {
    const { start, end } = this.schedule.time;
    return sameTime(start, end) || (['00:00', '24:00'].includes(timeToOption(start)) && ['00:00', '24:00'].includes(timeToOption(end)));
  }

  setBoost(value: number) {
    this.schedule.brightness = value;
    this.changed.emit();
  }

  setTime(key: 'start' | 'end', option: string) {
    this.schedule.time[key] = optionToTime(option);
    this.changed.emit();
  }
}
