
import { Task } from '../../app/types';

export const TASKS: Task[] = [
  {
    id: 1,
    title: 'Fix communication failure',
    status: 'New',
    priority: 'Low',
    device: 'Cīrulīši • Lamp 01-01/02',
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
    title: 'Fix communication failure',
    status: 'New',
    priority: 'High',
    device: 'Maļutki • Lamp 02-17/01',
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
    device: 'Maļutki • Lamp 01-16/02',
    eventId: 3,
    assignee: '',
    created: new Date('1/1/16'),
    updated: new Date('1/1/16'),
    comments: []
  },
  {
    id: 4,
    title: 'Fix communication failure',
    status: 'Rejected',
    priority: 'High',
    device: 'Maļutki • Lamp 02-17/01',
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
    priority: 'Normal',
    device: 'Maļutki • Lamp 01-16/02',
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
    device: 'Maļutki • Lamp 01-16/02',
    eventId: 3,
    assignee: '',
    created: new Date('1/1/16'),
    updated: new Date('1/1/16'),
    comments: []
  },
];
