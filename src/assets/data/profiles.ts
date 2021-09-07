import { Profile } from '~local/types';

export const TIME_OPTIONS = [
  { value: 'sunrise', viewValue: 'Sunrise' },
  { value: 'sunset', viewValue: 'Sunset' },
  { value: '00:00', viewValue: '00:00' },
  { value: '00:30', viewValue: '00:30' },
  { value: '01:00', viewValue: '01:00' },
  { value: '01:30', viewValue: '01:30' },
  { value: '02:00', viewValue: '02:00' },
  { value: '02:30', viewValue: '02:30' },
  { value: '03:00', viewValue: '03:00' },
  { value: '03:30', viewValue: '03:30' },
  { value: '04:00', viewValue: '04:00' },
  { value: '04:30', viewValue: '04:30' },
  { value: '05:00', viewValue: '05:00' },
  { value: '05:30', viewValue: '05:30' },
  { value: '06:00', viewValue: '06:00' },
  { value: '06:30', viewValue: '06:30' },
  { value: '07:00', viewValue: '07:00' },
  { value: '07:30', viewValue: '07:30' },
  { value: '08:00', viewValue: '08:00' },
  { value: '08:30', viewValue: '08:30' },
  { value: '09:00', viewValue: '09:00' },
  { value: '09:30', viewValue: '09:30' },
  { value: '10:00', viewValue: '10:00' },
  { value: '10:30', viewValue: '10:30' },
  { value: '11:00', viewValue: '11:00' },
  { value: '11:30', viewValue: '11:30' },
  { value: '12:00', viewValue: '12:00' },
  { value: '12:30', viewValue: '12:30' },
  { value: '13:00', viewValue: '13:00' },
  { value: '13:30', viewValue: '13:30' },
  { value: '14:00', viewValue: '14:00' },
  { value: '14:30', viewValue: '14:30' },
  { value: '15:00', viewValue: '15:00' },
  { value: '15:30', viewValue: '15:30' },
  { value: '16:00', viewValue: '16:00' },
  { value: '16:30', viewValue: '16:30' },
  { value: '17:00', viewValue: '17:00' },
  { value: '17:30', viewValue: '17:30' },
  { value: '18:00', viewValue: '18:00' },
  { value: '18:30', viewValue: '18:30' },
  { value: '19:00', viewValue: '19:00' },
  { value: '19:30', viewValue: '19:30' },
  { value: '20:00', viewValue: '20:00' },
  { value: '20:30', viewValue: '20:30' },
  { value: '21:00', viewValue: '21:00' },
  { value: '21:30', viewValue: '21:30' },
  { value: '22:00', viewValue: '22:00' },
  { value: '22:30', viewValue: '22:30' },
  { value: '23:00', viewValue: '23:00' },
  { value: '23:30', viewValue: '23:30' },
  { value: '24:00', viewValue: '24:00' },
];

export const PROFILES: Profile[] = [
  {
    id: 2,
    name: 'Shopping centre',
    description: '70% throughout the day',
    dynamic: false,
    schedules: [
      {
        name: 'Daytime',
        brightness: 0.8,
        time: {
          start: new Date(0, 0, 0, 6, 30, 0, 0),
          end: new Date(0, 0, 0, 22, 30, 0, 0),
          week: [
            { enabled: true },
            { enabled: true },
            { enabled: false },
            { enabled: false },
            { enabled: false },
            { enabled: false },
            { enabled: false }
          ]
        }
      },
      {
        name: 'Night',
        brightness: 0.4,
        time: {
          start: new Date(0, 0, 0, 6, 30, 0, 0),
          end: new Date(0, 0, 0, 22, 30, 0, 0),
          week: [
            { enabled: true },
            { enabled: true },
            { enabled: false },
            { enabled: false },
            { enabled: false },
            { enabled: false },
            { enabled: false }
          ]
        }
      }
    ],
    naturalLight: true,
    sun: true,
    motionSensor: true,
    parentId: null
  },
  {
    id: 3,
    name: 'Guļamrajons',
    dynamic: true,
    description:
      '70% on weekdays from 6:30 to 23:00, on weekends from 8:00 to 22:00. 30% the rest of the time. Accounts for traffic & natural light',
    schedules: [
      {
        name: 'Daytime',
        brightness: 0.8,
        time: {
          start: new Date(0, 0, 0, 6, 30, 0, 0),
          end: new Date(0, 0, 0, 22, 30, 0, 0),
          week: [
            { enabled: true },
            { enabled: true },
            { enabled: false },
            { enabled: false },
            { enabled: false },
            { enabled: false },
            { enabled: false }
          ]
        }
      },
      {
        name: 'Night',
        brightness: 0.4,
        time: {
          start: new Date(0, 0, 0, 6, 30, 0, 0),
          end: new Date(0, 0, 0, 22, 30, 0, 0),
          week: [
            { enabled: true },
            { enabled: true },
            { enabled: false },
            { enabled: false },
            { enabled: false },
            { enabled: false },
            { enabled: false }
          ]
        }
      }
    ],
    naturalLight: true,
    sun: true,
    motionSensor: true,
    parentId: null
  },
  {
    id: 4,
    name: 'Pedestrian crossing',
    description: '70% throughout the day',
    dynamic: true,
    schedules: [
      {
        name: 'Daytime',
        brightness: 0.8,
        time: {
          start: new Date(0, 0, 0, 6, 30, 0, 0),
          end: new Date(0, 0, 0, 22, 30, 0, 0),
          week: [
            { enabled: true },
            { enabled: true },
            { enabled: false },
            { enabled: false },
            { enabled: false },
            { enabled: false },
            { enabled: false }
          ]
        }
      },
      {
        name: 'Night',
        brightness: 0.4,
        time: {
          start: new Date(0, 0, 0, 6, 30, 0, 0),
          end: new Date(0, 0, 0, 22, 30, 0, 0),
          week: [
            { enabled: true },
            { enabled: true },
            { enabled: false },
            { enabled: false },
            { enabled: false },
            { enabled: false },
            { enabled: false }
          ]
        }
      }
    ],
    naturalLight: true,
    sun: true,
    motionSensor: true,
    parentId: null
  },
  {
    id: 5,
    name: 'Viduspoguļanka',
    description:
      '70% on weekdays from 6:30 to 23:00, on weekends from 8:00 to 22:00. 30% the rest of the time. Accounts for traffic & natural light',
    dynamic: true,
    // ??? How to encode cycle with Dates?
    schedules: [
      {
        name: 'Daytime',
        brightness: 0.4,
        time: {
          start: new Date(0, 0, 0, 7, 0,),
          end: new Date(0, 0, 0, 16, 0,),
          week: [
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true }
          ]
        }
      },
      {
        name: 'Night',
        brightness: 0.3,
        time: {
          start: new Date(0, 0, 0, 23, 0),
          end: new Date(0, 0, 0, 6, 0),
          week: [
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true }
          ]
        }
      }
    ],
    naturalLight: true,
    sun: true,
    motionSensor: true,
    parentId: null
  },
  {
    id: 6,
    name: 'New profile',
    description: '50% throughout the day',
    dynamic: true,
    schedules: [
      {
        name: 'Full',
        brightness: 0.5,
        time: {
          start: new Date(0, 0, 0, 0, 0, 0, 0),
          end: new Date(0, 0, 0, 24, 0, 0, 0),
          week: [
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true }
          ]
        }
      },
    ],
    schedulesDynamic: [
      {
        brightness: 0.2,
        time: {
          start:  new Date(0, 0, 0, 0),
          end:    new Date(0, 0, 0, 0)
        }
          }
    ],
    naturalLight: true,
    sun: true,
    motionSensor: true,
    parentId: null
  },
  {
    id: 1,
    name: 'Default',
    description: 'City default profile',
    dynamic: true,
    schedules: [
      {
        name: 'Full',
        brightness: 0.9,
        time: {
          start: new Date(0, 0, 0, 0, 0, 0, 0),
          end: new Date(0, 0, 0, 24, 0, 0, 0),
          week: [
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true }
          ]
        }
      },
      {
        name: 'Daytime',
        brightness: 0.7,
        time: {
          start: new Date(0, 0, 0, 0, 0, 0, 0),
          end: new Date(0, 0, 0, 24, 0, 0, 0),
          week: [
            { enabled: true },
            {
              enabled: true,
              start: new Date(0, 0, 0, 6, 0, 0, 0),
              end: new Date(0, 0, 0, 22, 0, 0, 0),
            },
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true }
          ]
        }
      },
      {
        name: 'Night',
        brightness: 0.4,
        time: {
          start: new Date(0, 0, 0, 6, 30, 0, 0),
          end: new Date(0, 0, 0, 22, 30, 0, 0),
          week: [
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: false },
            { enabled: false }
          ]
        }
      },
      {
        name: 'Weekend',
        brightness: 0.5,
        time: {
          start: new Date(0, 0, 0, 6, 30, 0, 0),
          end: new Date(0, 0, 0, 22, 30, 0, 0),
          week: [
            { enabled: false },
            { enabled: false },
            { enabled: false },
            { enabled: false },
            { enabled: false },
            { enabled: true },
            { enabled: true }
          ]
        }
      },
      {
        name: 'Full last',
        brightness: 0.9,
        time: {
          start: new Date(0, 0, 0, 0, 0, 0, 0),
          end: new Date(0, 0, 0, 24, 0, 0, 0),
          week: [
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true },
            { enabled: true }
          ]
        }
      }
    ],
    schedulesDynamic: [
      {
        brightness: 0.1,
        time: {
          start:  new Date(0, 0, 0, 2),
          end:    new Date(0, 0, 0, 5)
        }
      },
      {
        brightness: 0.2,
        time: {
          start:  new Date(0, 0, 0, 1),
          end:    new Date(0, 0, 0, 6)
        }
      },
      {
        brightness: 0.3,
        time: {
          start:  new Date(0, 0, 0, 16),
          end:    new Date(0, 0, 0, 7)
        }
      },
    ],
    naturalLight: true,
    sun: true,
    motionSensor: true,
    parentId: null
  },
];
