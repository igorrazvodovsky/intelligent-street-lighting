import { Profile } from '~local/types';

// Dimming profiles are a catalogue owned by the lighting operator and reused in
// every city, so they aren't city-scoped. Ids are referenced by groups and area
// names. Times sit on the half hour to match TIME_OPTIONS in the schedule editor.

const t = (hours: number, minutes = 0) => new Date(0, 0, 0, hours, minutes);

// Week arrays run Monday to Sunday
const everyDay = () => Array.from({ length: 7 }, () => ({ enabled: true }));
const onDays = (days: number[]) => Array.from({ length: 7 }, (e, i) => ({ enabled: days.includes(i) }));

export const PROFILES: Profile[] = [
  {
    id: 1,
    name: 'Default',
    description: '100% from dusk, 50% from 23:00 to 05:00. Rises to 100% with traffic',
    dynamic: true,
    isInterpolated: true,
    schedules: [
      { name: 'Evening and morning', brightness: 1, time: { start: t(0), end: t(24), week: everyDay() } },
      { name: 'Night', brightness: 0.5, time: { start: t(23), end: t(5), week: everyDay() } },
    ],
    schedulesDynamic: [
      { brightness: 0.5, time: { start: t(23), end: t(5) } },
    ],
    naturalLight: true,
    sun: true,
    motionSensor: true,
    parentId: null
  },
  {
    id: 2,
    name: 'Shopping centre',
    description: '100% during opening hours, 60% after 22:00 (23:00 on Fridays and Saturdays)',
    dynamic: false,
    isInterpolated: true,
    schedules: [
      { name: 'Opening hours', brightness: 1, time: { start: t(0), end: t(24), week: everyDay() } },
      {
        name: 'After closing',
        brightness: 0.6,
        time: {
          start: t(22),
          end: t(6),
          week: [
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true, start: t(23), end: t(6) },
            { enabled: true, start: t(23), end: t(6) },
            { enabled: true },
          ]
        }
      },
    ],
    naturalLight: true,
    sun: true,
    motionSensor: false,
    parentId: null
  },
  {
    id: 3,
    name: 'Residential',
    description: '70% until 23:00 on weekdays and 00:00 at weekends, 30% after. Rises by 40% with traffic',
    dynamic: true,
    isInterpolated: true,
    schedules: [
      { name: 'Evening', brightness: 0.7, time: { start: t(0), end: t(24), week: everyDay() } },
      { name: 'Weeknight', brightness: 0.3, time: { start: t(23), end: t(6), week: onDays([0, 1, 2, 3, 6]) } },
      { name: 'Weekend night', brightness: 0.3, time: { start: t(0), end: t(7), week: onDays([4, 5]) } },
    ],
    schedulesDynamic: [
      { brightness: 0.4, time: { start: t(23), end: t(6) } },
    ],
    naturalLight: true,
    sun: true,
    motionSensor: true,
    parentId: null
  },
  {
    id: 4,
    name: 'Pedestrian crossing',
    description: '100% from dusk to dawn, never dimmed',
    dynamic: false,
    isInterpolated: false,
    schedules: [
      { name: 'Dusk to dawn', brightness: 1, time: { start: t(0), end: t(24), week: everyDay() } },
    ],
    naturalLight: true,
    sun: true,
    motionSensor: false,
    parentId: null
  },
  {
    id: 5,
    name: 'Park and footpath',
    description: '50% until 22:00, 20% overnight. Rises by 60% when someone passes',
    dynamic: true,
    isInterpolated: true,
    schedules: [
      { name: 'Evening', brightness: 0.5, time: { start: t(0), end: t(24), week: everyDay() } },
      { name: 'Night', brightness: 0.2, time: { start: t(22), end: t(6), week: everyDay() } },
    ],
    schedulesDynamic: [
      { brightness: 0.6, time: { start: t(22), end: t(6) } },
    ],
    naturalLight: true,
    sun: true,
    motionSensor: true,
    parentId: null
  },
  {
    id: 6,
    name: 'Main road',
    description: '100% until 00:00, 75% from 00:00 to 05:00. Rises to 100% with traffic',
    dynamic: true,
    isInterpolated: true,
    schedules: [
      { name: 'Evening and morning', brightness: 1, time: { start: t(0), end: t(24), week: everyDay() } },
      { name: 'Night', brightness: 0.75, time: { start: t(0), end: t(5), week: everyDay() } },
    ],
    schedulesDynamic: [
      { brightness: 0.25, time: { start: t(0), end: t(5) } },
    ],
    naturalLight: true,
    sun: true,
    motionSensor: true,
    parentId: null
  },
];
