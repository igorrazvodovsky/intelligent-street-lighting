import { Profile } from '~local/types';

// Dimming profiles are a catalogue owned by the lighting operator and reused in
// every city, so they aren't city-scoped. Ids are referenced by groups, area
// names and devices. Times sit on the half hour to match TIME_OPTIONS in the
// schedule editor.
//
// Lights only burn between dusk and dawn, so a schedule from 00:00 to 24:00
// reads as "dusk to dawn". A schedule enabled on a weekday covers the night that
// starts that evening: 00:00–06:00 on Friday dims the small hours of Saturday.
//
// Levels follow common Nordic practice. Stockholm dims LED street lighting by a
// third for six hours a night, a cut people don't notice; halving is noticeable.
// Roads drop one or two EN 13201 lighting classes when traffic is low (M3 → M4
// is 1.0 → 0.75 cd/m², M5 is 0.5). Paths with presence detection keep a low
// base level and go to full brightness when someone passes. Pedestrian crossings
// are usually left undimmed.

const t = (hours: number, minutes = 0) => new Date(0, 0, 0, hours, minutes);

// Week arrays run Monday to Sunday
const everyDay = () => Array.from({ length: 7 }, () => ({ enabled: true }));
const onDays = (days: number[]) => Array.from({ length: 7 }, (e, i) => ({ enabled: days.includes(i) }));

// Nights followed by a working day, and Friday and Saturday nights
const WEEKNIGHTS = [0, 1, 2, 3, 6];
const WEEKEND_NIGHTS = [4, 5];

export const PROFILES: Profile[] = [
  {
    id: 1,
    name: 'Default',
    description: '100% from dusk, 67% from 00:00 to 06:00. Back to 100% with traffic',
    dynamic: true,
    isInterpolated: true,
    schedules: [
      { name: 'Dusk to dawn', brightness: 1, time: { start: t(0), end: t(24), week: everyDay() } },
      { name: 'Night', brightness: 0.67, time: { start: t(0), end: t(6), week: everyDay() } },
    ],
    schedulesDynamic: [
      { brightness: 0.33, time: { start: t(0), end: t(6) } },
    ],
    naturalLight: true,
    sun: true,
    motionSensor: true,
    parentId: null
  },
  {
    id: 2,
    name: 'Shopping centre',
    description: '100% until an hour after closing, 50% from 22:00 to 06:00 (from 00:00 on Friday and Saturday nights)',
    dynamic: false,
    isInterpolated: true,
    schedules: [
      { name: 'Opening hours', brightness: 1, time: { start: t(0), end: t(24), week: everyDay() } },
      {
        name: 'After closing',
        brightness: 0.5,
        time: {
          start: t(22),
          end: t(6),
          week: [
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true, start: t(0), end: t(6) },
            { enabled: true, start: t(0), end: t(6) },
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
    description: '80% in the evening, 40% overnight from 22:00 (00:00 on Friday and Saturday nights). Rises to 100% when someone passes',
    dynamic: true,
    isInterpolated: true,
    schedules: [
      { name: 'Evening', brightness: 0.8, time: { start: t(0), end: t(24), week: everyDay() } },
      { name: 'Weeknight', brightness: 0.4, time: { start: t(22), end: t(6), week: onDays(WEEKNIGHTS) } },
      { name: 'Weekend night', brightness: 0.4, time: { start: t(0), end: t(7), week: onDays(WEEKEND_NIGHTS) } },
    ],
    schedulesDynamic: [
      { brightness: 0.2, time: { start: t(0), end: t(24) } },
      { brightness: 0.6, time: { start: t(22), end: t(7) } },
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
    description: '50% in the evening, 20% from 22:00 to 06:00. Rises to 100% when someone passes',
    dynamic: true,
    isInterpolated: true,
    schedules: [
      { name: 'Evening', brightness: 0.5, time: { start: t(0), end: t(24), week: everyDay() } },
      { name: 'Night', brightness: 0.2, time: { start: t(22), end: t(6), week: everyDay() } },
    ],
    schedulesDynamic: [
      { brightness: 0.5, time: { start: t(0), end: t(24) } },
      { brightness: 0.8, time: { start: t(22), end: t(6) } },
    ],
    naturalLight: true,
    sun: true,
    motionSensor: true,
    parentId: null
  },
  {
    id: 6,
    name: 'Main road',
    description: '100% in the evening and morning, 75% from 22:00 to 06:00, 50% from 00:00 to 05:00 on weeknights. Back to 100% with traffic',
    dynamic: true,
    isInterpolated: true,
    schedules: [
      { name: 'Evening and morning', brightness: 1, time: { start: t(0), end: t(24), week: everyDay() } },
      { name: 'Late evening', brightness: 0.75, time: { start: t(22), end: t(6), week: everyDay() } },
      { name: 'Night', brightness: 0.5, time: { start: t(0), end: t(5), week: onDays(WEEKNIGHTS) } },
    ],
    schedulesDynamic: [
      { brightness: 0.25, time: { start: t(22), end: t(6) } },
      { brightness: 0.5, time: { start: t(0), end: t(5) } },
    ],
    naturalLight: true,
    sun: true,
    motionSensor: true,
    parentId: null
  },
  {
    id: 7,
    name: 'Part-night',
    description: '100% from dusk to 01:00, off from 01:00 to 05:00. For rural roads and car parks with no traffic at night',
    dynamic: false,
    isInterpolated: false,
    schedules: [
      { name: 'Dusk to dawn', brightness: 1, time: { start: t(0), end: t(24), week: everyDay() } },
      { name: 'Switched off', brightness: 0, time: { start: t(1), end: t(5), week: everyDay() } },
    ],
    // Timer-driven, with no light sensor
    naturalLight: false,
    sun: true,
    motionSensor: false,
    parentId: null
  },
];
