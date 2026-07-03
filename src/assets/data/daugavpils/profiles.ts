import { Profile } from '~local/types';

export const PROFILES: Profile[] = [
  {
    id: 2,
    name: 'Shopping centre',
    description: '70% throughout the day',
    dynamic: false,
    isInterpolated: true,
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
    isInterpolated: true,
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
    isInterpolated: true,
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
    isInterpolated: true,
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
    isInterpolated: true,
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
          start: new Date(0, 0, 0, 0),
          end: new Date(0, 0, 0, 0)
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
    isInterpolated: true,
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
          start: new Date(0, 0, 0, 2),
          end: new Date(0, 0, 0, 5)
        }
      },
      {
        brightness: 0.2,
        time: {
          start: new Date(0, 0, 0, 1),
          end: new Date(0, 0, 0, 6)
        }
      },
      {
        brightness: 0.3,
        time: {
          start: new Date(0, 0, 0, 16),
          end: new Date(0, 0, 0, 7)
        }
      },
    ],
    naturalLight: true,
    sun: true,
    motionSensor: true,
    parentId: null
  },
];
