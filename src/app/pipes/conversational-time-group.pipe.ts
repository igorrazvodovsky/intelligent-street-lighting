// TODO: Connect last day with 'and' in English
// TODO: Better array comparision?

import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
import { TimeGroup } from '../types';
import { formatDate } from '@angular/common';

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

  constructor(@Inject(LOCALE_ID) private locale: string) { }

  transform(group: TimeGroup, position: string): any {
    const entireWeek = JSON.stringify(group.days) == JSON.stringify(this.entireWeek)
    const fullDay = (group.start.getHours() + group.start.getMinutes() == 0 && group.end.getHours() + group.end.getMinutes() == 0)

    if (!fullDay) {
      this.time = 'from ' + formatDate(group.start, 'HH:mm', this.locale) + ' to ' + formatDate(group.end, 'HH:mm', this.locale)
    }

    if (fullDay) this.time = 'full day'
    if (entireWeek && fullDay) {
      this.days = position == 'last' ? 'rest of the time' : 'around the clock'
      this.time = ''
    }
    else if (entireWeek) this.days = 'every day'
    else if (JSON.stringify(group.days) == JSON.stringify(this.workWeek)) this.days = 'on workweek'
    else if (JSON.stringify(group.days) === JSON.stringify(this.weekend)) this.days = 'on weekends'
    else this.days = 'on ' + this.weekDays.filter((weekDay, i) => group.days.includes(i)).join(', ');

    return this.days + (this.time ? ' ' + this.time : '') + ('last' ? '' : '; ')
    // TODO: 'rest of the time' depending on the number of schedules

  }

}
