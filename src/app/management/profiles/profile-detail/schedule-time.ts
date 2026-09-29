import { ScheduleTime } from '~local/types';

// Converts schedule times to and from the values of TIME_OPTIONS: 'HH:mm',
// '24:00', 'sunset' and 'sunrise'.

// The same arbitrary day the fixtures use
export const clockTime = (hours: number, minutes = 0) => new Date(0, 0, 0, hours, minutes);

const pad = (n: number) => String(n).padStart(2, '0');

export function timeToOption(time: ScheduleTime): string {
  if (!(time instanceof Date)) return time;
  // 24:00 rolls over to the next day
  if (time.getDate() !== clockTime(0).getDate()) return '24:00';
  return `${pad(time.getHours())}:${pad(time.getMinutes())}`;
}

export function optionToTime(option: string): ScheduleTime {
  if (option === 'sunset' || option === 'sunrise') return option;
  const [hours, minutes] = option.split(':').map(Number);
  return clockTime(hours, minutes);
}

export const sameTime = (a?: ScheduleTime, b?: ScheduleTime) =>
  a === b || (!!a && !!b && timeToOption(a) === timeToOption(b));
