import { Component, OnInit, Input } from '@angular/core';
import { Schedule, TimeGroup } from '~local/types'
import { TIME_OPTIONS } from '~local/../assets/data/profiles'

@Component({
  selector: 'profile-schedule',
  templateUrl: './profile-schedule.component.html',
  styleUrls: ['./profile-schedule.component.scss']
})
export class ProfileScheduleComponent implements OnInit {
  @Input() schedule: Schedule;
  @Input() last: boolean;
  @Input() first: boolean;
  week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  daysActive = null
  timeGroups: TimeGroup[] = []
  timeOptions = TIME_OPTIONS

  constructor() { }

  ngOnInit(): void {
    // Create first time range from default time values
    this.timeGroups[0] = {
      days: [],
      start: this.schedule.time.start,
      end: this.schedule.time.end
    }
    // Go through the week to check for custom time settings
    this.schedule.time.week.forEach((weekDay, i) => {
      if (weekDay.enabled) {
        if (weekDay.start || weekDay.end) {
          // Check if time is the same
          const found = this.timeGroups.some(group => group.start == weekDay.start && group.end == weekDay.end);
          if (!found) this.timeGroups.push({
            days: [i],
            start: weekDay.start,
            end: weekDay.end
          }); else {
            const groupIndex = this.timeGroups.findIndex((group => group.start == weekDay.start && group.end == weekDay.end));
            this.timeGroups[groupIndex].days.push[i]
          };

          if (weekDay.end !== this.schedule.time.end) { }
          // Find or create a new group
        } else this.timeGroups[0].days.push(i)
      }
    })
  }

}
