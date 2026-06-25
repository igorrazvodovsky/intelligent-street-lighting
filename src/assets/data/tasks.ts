
import { Task } from '~local/types';

export const TASKS: Task[] = [
  {
    id: 1,
    title: 'Fix communication failure',
    status: 'New',
    priority: 'Low',
    deviceId: 12,
    eventId: 1,
    assignee: 'Niall Mercado',
    created: new Date('1/1/16'),
    updated: new Date('1/1/16'),
    comments: [
      {
        id: 1,
        author: 'John',
        comment: 'On my way.',
        created: new Date('1/1/16'),
      },
      {
        id: 2,
        author: 'Mary',
        comment: 'I am not doing this.',
        created: new Date('1/1/16'),
      }
    ]
  },
  {
    id: 2,
    title: 'Fix the GSM signal issue',
    description: 'GSM signal of poor quality. Need to check the antenna.',
    status: 'New',
    priority: 'High',
    deviceId: 15,
    eventId: 1,
    assignee: '',
    created: new Date('1/1/16'),
    updated: new Date('1/1/16'),
    comments: []
  },
  {
    id: 3,
    title: 'Close the door',
    status: 'In progress',
    priority: 'Normal',
    deviceId: 14,
    eventId: 3,
    assignee: 'Ava Wright',
    created: new Date('1/1/16'),
    updated: new Date('1/1/16'),
    comments: []
  },
  {
    id: 4,
    title: 'Fix communication failure',
    status: 'Rejected',
    priority: 'High',
    deviceId: 13,
    eventId: 1,
    assignee: '',
    created: new Date('1/1/16'),
    updated: new Date('1/1/16'),
    comments: []
  },
  {
    id: 5,
    title: 'Close the door',
    status: 'Resolved',
    description: 'Example of a task not connected to the event.',
    priority: 'Normal',
    deviceId: 11,
    eventId: 3,
    assignee: '',
    created: new Date('1/1/16'),
    updated: new Date('1/1/16'),
    comments: []
  },
  {
    id: 6,
    title: 'Power is too high',
    status: 'Closed',
    priority: 'Normal',
    deviceId: 11,
    assignee: '',
    created: new Date('1/1/16'),
    updated: new Date('1/1/16'),
    comments: []
  },
  {
    id: 7,
    title: 'Lost communication with SC on Solnavägen',
    description: 'SV-006 stopped responding. Suspect GSM module or power supply fault.',
    status: 'New',
    priority: 'High',
    deviceId: 207,
    eventId: 21,
    assignee: 'Ava Wright',
    created: new Date('6/20/26'),
    updated: new Date('6/25/26'),
    comments: [
      {
        id: 3,
        author: 'Lori Bryson',
        comment: 'Last seen 14:32 yesterday. No ping since.',
        created: new Date('6/24/26'),
      }
    ]
  },
  {
    id: 8,
    title: 'Replace LED module at Hagalund',
    description: 'HL-008 reports LED module failure. Needs on-site inspection and replacement.',
    status: 'In progress',
    priority: 'High',
    deviceId: 248,
    eventId: 22,
    assignee: 'Noah Pierre',
    created: new Date('6/23/26'),
    updated: new Date('6/25/26'),
    comments: [
      {
        id: 4,
        author: 'Noah Pierre',
        comment: 'Module ordered, ETA 2 days.',
        created: new Date('6/24/26'),
      }
    ]
  },
  {
    id: 9,
    title: 'Investigate overheating on E4 highway lamp',
    description: 'E4-J2 controller temperature exceeding threshold. Industrial area, possible dust accumulation.',
    status: 'New',
    priority: 'Normal',
    deviceId: 282,
    eventId: 23,
    assignee: '',
    created: new Date('6/24/26'),
    updated: new Date('6/25/26'),
    comments: []
  },
  {
    id: 10,
    title: 'Check cabinet temperature at Karolinska SC',
    description: 'SC-K1 reports elevated temperature. Located near HVAC exhaust - investigate ventilation.',
    status: 'New',
    priority: 'Low',
    deviceId: 300,
    eventId: 24,
    assignee: 'Kate Morrison',
    created: new Date('6/23/26'),
    updated: new Date('6/24/26'),
    comments: []
  },
  {
    id: 11,
    title: 'Voltage drop investigation on Råsundavägen',
    description: 'RV-005 reports intermittent voltage drops during peak hours. Check grid connection.',
    status: 'In progress',
    priority: 'Normal',
    deviceId: 225,
    eventId: 25,
    assignee: 'Dustin Mock',
    created: new Date('6/21/26'),
    updated: new Date('6/25/26'),
    comments: [
      {
        id: 5,
        author: 'Dustin Mock',
        comment: 'Grid meter readings normal. Checking distribution panel.',
        created: new Date('6/23/26'),
      }
    ]
  },
  {
    id: 12,
    title: 'Adjust orientation of Bergshamra lamp',
    description: 'BG-006 orientation appears incorrect. Light spill into residential windows.',
    status: 'Resolved',
    priority: 'Low',
    deviceId: 316,
    assignee: 'Sophia Perez',
    created: new Date('6/19/26'),
    updated: new Date('6/22/26'),
    comments: [
      {
        id: 6,
        author: 'Sophia Perez',
        comment: 'Re-angled to 90°, no more glare.',
        created: new Date('6/22/26'),
      }
    ]
  },
  {
    id: 13,
    title: 'Sensor calibration at Arenastaden',
    description: 'AQ-Arena environmental sensor has drifted. Needs recalibration before next event.',
    status: 'New',
    priority: 'Normal',
    deviceId: 298,
    assignee: '',
    created: new Date('6/25/26'),
    updated: new Date('6/25/26'),
    comments: []
  },
  {
    id: 14,
    title: 'Inactive lamp on Strandpromenaden',
    description: 'HV-008 has been inactive since inspection. Verify power supply and control signal.',
    status: 'Rejected',
    priority: 'Normal',
    deviceId: 268,
    assignee: 'Jahlil Kyle',
    created: new Date('6/18/26'),
    updated: new Date('6/20/26'),
    comments: [
      {
        id: 7,
        author: 'Jahlil Kyle',
        comment: 'Lamp is offline due to construction work. Will re-activate when site clears.',
        created: new Date('6/20/26'),
      }
    ]
  },
];
