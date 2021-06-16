import { Profile } from '../../app/types';

export const PROFILES: Profile[] = [
  {
  id: 1,
  name: 'Default',
  description: 'Default. 80% on weekdays from 6:30 to 23:00, on weekends from 8:00 to 22:00. 30% the rest of the time. Accounts for traffic & natural light.',
  summary:
  [
    {
      day: 'mon',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ]
    },
    {
      day: 'tue',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ],
    },
    {
      day: 'wed',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ],
    },
    {
      day: 'thu',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ],
    },
    {
      day: 'fri',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ],
    },
  ],
  settings: [
    {
      name: 'Daytime',
      brightness: 0.8,
      schedule: [
        {
          day: 'mon',
          time:
          [
            {
              start: '6:30',
              end: '22:30'
            }
          ]
        },
        {
          day: 'tue',
          time:
          [
            {
              start: '6:30',
              end: '22:30'
            }
          ]
        }
      ]
    },
    {
      name: 'Night',
      brightness: 0.4,
      schedule: [
        {
          day: 'mon',
          time:
          [
            {
              start: '0:00',
              end: '06:30'
            },
            {
              start: '22:30',
              end: '0:00'
            }
          ]
        }
      ]
    }
  ],
  naturalLight: true,
  sun: true,
  motionSensor: true,
  parentId: null
  },
  {
  id: 2,
  name: 'Shopping centre',
  description: '70% throughout the day',
  summary:
  [
    {
      day: 'mon',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ]
    },
    {
      day: 'tue',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ],
    },
    {
      day: 'wed',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ],
    },
    {
      day: 'thu',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ],
    },
    {
      day: 'fri',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ],
    },
  ],
  settings: [
    {
      name: 'Daytime',
      brightness: 0.8,
      schedule: [
        {
          day: 'mon',
          time:
          [
            {
              start: '6:30',
              end: '22:30'
            }
          ]
        },
        {
          day: 'tue',
          time:
          [
            {
              start: '6:30',
              end: '22:30'
            }
          ]
        }
      ]
    },
    {
      name: 'Night',
      brightness: 0.4,
      schedule: [
        {
          day: 'mon',
          time:
          [
            {
              start: '0:00',
              end: '06:30'
            },
            {
              start: '22:30',
              end: '0:00'
            }
          ]
        }
      ]
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
  description: '70% on weekdays from 6:30 to 23:00, on weekends from 8:00 to 22:00. 30% the rest of the time. Accounts for traffic & natural light.',
  summary:
  [
    {
      day: 'mon',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ]
    },
    {
      day: 'tue',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ],
    },
    {
      day: 'wed',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ],
    },
    {
      day: 'thu',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ],
    },
    {
      day: 'fri',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ],
    },
  ],
  settings: [
    {
      name: 'Daytime',
      brightness: 0.8,
      schedule: [
        {
          day: 'mon',
          time:
          [
            {
              start: '6:30',
              end: '22:30'
            }
          ]
        },
        {
          day: 'tue',
          time:
          [
            {
              start: '6:30',
              end: '22:30'
            }
          ]
        }
      ]
    },
    {
      name: 'Night',
      brightness: 0.4,
      schedule: [
        {
          day: 'mon',
          time:
          [
            {
              start: '0:00',
              end: '06:30'
            },
            {
              start: '22:30',
              end: '0:00'
            }
          ]
        }
      ]
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
  summary:
  [
    {
      day: 'mon',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ]
    },
    {
      day: 'tue',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ],
    },
    {
      day: 'wed',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ],
    },
    {
      day: 'thu',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ],
    },
    {
      day: 'fri',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ],
    },
  ],
  settings: [
    {
      name: 'Daytime',
      brightness: 0.8,
      schedule: [
        {
          day: 'mon',
          time:
          [
            {
              start: '6:30',
              end: '22:30'
            }
          ]
        },
        {
          day: 'tue',
          time:
          [
            {
              start: '6:30',
              end: '22:30'
            }
          ]
        }
      ]
    },
    {
      name: 'Night',
      brightness: 0.4,
      schedule: [
        {
          day: 'mon',
          time:
          [
            {
              start: '0:00',
              end: '06:30'
            },
            {
              start: '22:30',
              end: '0:00'
            }
          ]
        }
      ]
    }
  ],
  naturalLight: true,
  sun: true,
  motionSensor: true,
  parentId: null
  },
  {
  id: 5,
  name: 'Another one',
  description: '70% on weekdays from 6:30 to 23:00, on weekends from 8:00 to 22:00. 30% the rest of the time. Accounts for traffic & natural light.',
  summary:
  [
    {
      day: 'mon',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ]
    },
    {
      day: 'tue',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ],
    },
    {
      day: 'wed',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ],
    },
    {
      day: 'thu',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ],
    },
    {
      day: 'fri',
      schedule: [
        {
          time: '0:00',
          brightness: 0.3
        },
        {
          time: '6:30',
          brightness: 0.7
        },
        {
          time: '22:30',
          brightness: 0.3
        }
      ],
    },
  ],
  settings: [
    {
      name: 'Daytime',
      brightness: 0.8,
      schedule: [
        {
          day: 'mon',
          time:
          [
            {
              start: '6:30',
              end: '22:30'
            }
          ]
        },
        {
          day: 'tue',
          time:
          [
            {
              start: '6:30',
              end: '22:30'
            }
          ]
        }
      ]
    },
    {
      name: 'Night',
      brightness: 0.4,
      schedule: [
        {
          day: 'mon',
          time:
          [
            {
              start: '0:00',
              end: '06:30'
            },
            {
              start: '22:30',
              end: '0:00'
            }
          ]
        }
      ]
    }
  ],
  naturalLight: true,
  sun: true,
  motionSensor: true,
  parentId: null
  }
];



