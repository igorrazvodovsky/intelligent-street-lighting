import { Task } from '~local/types';

// Ids stay clear of Solna's (7–14). A task's event is on the same device and
// points back to the task.
export const TASKS: Task[] = [
  {
    id: 1,
    title: 'Fix communication failure',
    description: '01-003 stopped responding. Check the controller and its antenna.',
    status: 'New',
    priority: 'Low',
    deviceId: 13,
    eventId: 3,
    assignee: 'Andris Vītols',
    created: new Date('9/21/26'),
    updated: new Date('9/23/26'),
    comments: [
      {
        id: 1,
        author: 'Andris Vītols',
        comment: 'On my way.',
        created: new Date('9/22/26'),
      },
      {
        id: 2,
        author: 'Ilze Bērziņa',
        comment: 'Cabinet is behind the depot gate, need a key from the depot first.',
        created: new Date('9/23/26'),
      }
    ]
  },
  {
    id: 2,
    title: 'Fix the GSM signal issue',
    description: 'GSM signal of poor quality. Need to check the antenna.',
    status: 'New',
    priority: 'High',
    deviceId: 11,
    eventId: 12,
    assignee: '',
    created: new Date('9/24/26'),
    updated: new Date('9/24/26'),
    comments: []
  },
  {
    id: 3,
    title: 'Close the door',
    description: 'The controller cabinet reports its door open.',
    status: 'In progress',
    priority: 'Normal',
    deviceId: 11,
    eventId: 8,
    assignee: 'Dmitrijs Ivanovs',
    created: new Date('9/25/26'),
    updated: new Date('9/26/26'),
    comments: []
  },
  {
    id: 4,
    title: 'Fix communication failure',
    description: 'Duplicate of the task for the same lamp.',
    status: 'Rejected',
    priority: 'High',
    deviceId: 13,
    assignee: '',
    created: new Date('9/21/26'),
    updated: new Date('9/22/26'),
    comments: []
  },
  {
    id: 5,
    title: 'Close the door',
    description: 'Door found open during a routine check, not reported by the controller.',
    status: 'Resolved',
    priority: 'Normal',
    deviceId: 37,
    assignee: 'Līga Ozola',
    created: new Date('9/8/26'),
    updated: new Date('9/9/26'),
    comments: []
  },
  {
    id: 6,
    title: 'Power is too high',
    status: 'Closed',
    priority: 'Normal',
    deviceId: 11,
    assignee: 'Dmitrijs Ivanovs',
    created: new Date('8/17/26'),
    updated: new Date('8/20/26'),
    comments: []
  },
  {
    id: 15,
    title: 'Replace LED module on 03-017',
    description: 'The lamp by the bus station reports an LED module failure.',
    status: 'In progress',
    priority: 'High',
    deviceId: 66,
    eventId: 7,
    assignee: 'Raimonds Zariņš',
    created: new Date('9/27/26'),
    updated: new Date('9/29/26'),
    comments: [
      {
        id: 20,
        author: 'Raimonds Zariņš',
        comment: 'Spare module picked up from the depot.',
        created: new Date('9/29/26'),
      }
    ]
  },
  {
    id: 16,
    title: 'Restore power in Liginiški',
    description: '08-008 has no mains voltage. Check the feeder and the fuse in the pole.',
    status: 'New',
    priority: 'High',
    deviceId: 116,
    eventId: 10,
    assignee: 'Aleksandrs Kozlovs',
    created: new Date('9/29/26'),
    updated: new Date('9/29/26'),
    comments: []
  },
];
