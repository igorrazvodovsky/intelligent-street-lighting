// TODO: Connect last day with 'and' in English
// TODO: Better array comparision?

import { Pipe, PipeTransform } from '@angular/core';
import { TimeGroup } from '../types';
import { timeToOption } from '~local/management/profiles/profile-detail/schedule-time';

@Pipe({
  name: 'conversationalTimeGroup'
})
export class ConversationalTimeGroupPipe implements PipeTransform {
  weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  entireWeek = [0, 1, 2, 3, 4, 5, 6]
  workWeek = [0, 1, 2, 3, 4]
  weekend = [5, 6]

  days = ''
  time = ''

  // `position` is 'rest' for a schedule that others override
  transform(group: TimeGroup, position: string = 'first'): any {
    const entireWeek = JSON.stringify(group.days) == JSON.stringify(this.entireWeek)
    const fullDay = ['00:00', '24:00'].includes(timeToOption(group.start)) && ['00:00', '24:00'].includes(timeToOption(group.end))

    if (!fullDay) {
      this.time = 'from ' + timeToOption(group.start) + ' to ' + timeToOption(group.end)
    }

    // Lamps only burn in the dark, so a full day means dusk to dawn
    if (fullDay) this.time = 'from dusk to dawn'
    if (entireWeek && fullDay) {
      this.days = position == 'rest' ? 'rest of the night' : 'from dusk to dawn'
      this.time = ''
    }
    else if (entireWeek) this.days = ''
    else if (JSON.stringify(group.days) == JSON.stringify(this.workWeek)) this.days = 'on workweek'
    else if (JSON.stringify(group.days) === JSON.stringify(this.weekend)) this.days = 'on weekends'
    else this.days = 'on ' + this.weekDays.filter((weekDay, i) => group.days.includes(i)).join(', ');

    // TODO: Check for the 'last' doesn't work
    return this.days + (this.time ? ' ' + this.time : '') + ('last' ? '' : '; ')
    // TODO: 'rest of the time' depending on the number of schedules

  }

}
