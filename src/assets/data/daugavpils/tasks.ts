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
];
