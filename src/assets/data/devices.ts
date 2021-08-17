import { Device, DeviceGroup, SensorType } from '~local/types';

export const DEVICES: Device[] = [
  {
    id: 11,
    type: 'lamp',
    name: '01-01',
    groupId: 1,
    model: 'LC2M2305R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false,
    sensors: ['motion', 'traffic']
  },
  {
    id: 12,
    type: 'lamp',
    name: '01-02',
    groupId: 1,
    model: 'MSLC205RL',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: true,
    sensors: ['motion']
  },
  {
    id: 13,
    type: 'lamp',
    name: '01-03',
    groupId: 1,
    model: 'MSLC205RL',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: true
  },
  {
    id: 14,
    type: 'lamp',
    name: '01-04',
    groupId: 1,
    model: 'NLC2M1205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false,
    sensors: ['traffic']
  },
  {
    id: 15,
    type: 'lamp',
    name: '01-05',
    groupId: 1,
    model: 'LC2M2305R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: true
  },
  {
    id: 16,
    type: 'lamp',
    name: '01-06',
    groupId: 1,
    model: 'NLC2M1205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 17,
    type: 'lamp',
    name: '01-07',
    groupId: 1,
    model: 'LC2M2305R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: true
  },
  {
    id: 18,
    type: 'lamp',
    name: '01-08',
    groupId: 1,
    model: 'LC2M2305R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false,
    sensors: ['wifi']
  },
  {
    id: 19,
    type: 'lamp',
    name: '01-09',
    groupId: 1,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 20,
    type: 'lamp',
    name: '02-01',
    groupId: 2,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 21,
    type: 'lamp',
    name: '02-21',
    groupId: 2,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 22,
    type: 'lamp',
    name: '02-22',
    groupId: 2,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 23,
    type: 'lamp',
    name: '02-23',
    groupId: 2,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 24,
    type: 'lamp',
    name: '02-24',
    groupId: 2,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 25,
    type: 'lamp',
    name: '02-25',
    groupId: 2,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 26,
    type: 'lamp',
    name: '02-26',
    groupId: 2,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 27,
    type: 'lamp',
    name: '02-27',
    groupId: 2,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 28,
    type: 'lamp',
    name: '02-28',
    groupId: 2,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 29,
    type: 'lamp',
    name: '02-29',
    groupId: 2,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 30,
    type: 'lamp',
    name: '02-30',
    groupId: 2,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 31,
    type: 'lamp',
    name: '03-01',
    groupId: null,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 32,
    type: 'lamp',
    name: '03-02',
    groupId: null,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 33,
    type: 'lamp',
    name: '03-03',
    groupId: null,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 34,
    type: 'lamp',
    name: '03-04',
    groupId: null,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 100,
    type: 'sc',
    name: 'SC1',
    groupId: 1,
    model: 'CSC220734DA14',
    firmware: '0.1.0',
    surgeProtector: false
  },
];

export const GROUPS: DeviceGroup[] = [
  {
    id: 1,
    name: 'Dzelzceļnieks',
    profileId: 1,
    parentId: null,
    children: [],
    created: new Date(2021, 1)
  },
  {
    id: 2,
    name: 'Cietoksnis',
    profileId: 2,
    parentId: null,
    children: [],
    created: new Date(2021, 1)
  },
  {
    id: 3,
    name: 'Autoosta',
    profileId: 2,
    parentId: null,
    children: [],
    created: new Date(2021, 1)
  },
  {
    id: 4,
    name: 'Čerepova',
    profileId: 1,
    parentId: null,
    children: [],
    created: new Date(2021, 1)
  },
  {
    id: 5,
    name: 'Lokomotīve',
    profileId: 3,
    parentId: null,
    children: [],
    created: new Date(2021, 1)
  },
  {
    id: 6,
    name: 'Mark Rothko Center',
    profileId: 2,
    parentId: null,
    children: [],
    created: new Date(2021, 1)
  },
  {
    id: 7,
    name: 'Svēto mocekļu Borisa un Gļeba pareizticīgo katedrāle',
    profileId: 1,
    parentId: null,
    children: [],
    created: new Date(2021, 1)
  },
  {
    id: 8,
    name: 'Liginiški',
    profileId: 1,
    parentId: null,
    children: [],
    created: new Date(2021, 1)
  },
  {
    id: 9,
    name: 'Skate park',
    profileId: 1,
    parentId: null,
    children: [],
    created: new Date(2021, 1)
  },
  {
    id: 10,
    name: 'Kārklu iela',
    profileId: 1,
    parentId: null,
    children: [11, 12],
    created: new Date(2021, 1)
  },
  {
    id: 11,
    name: 'Kārklu ielas pirma daļa',
    profileId: 1,
    parentId: 10,
    children: [],
    created: new Date(2021, 1)
  },
  {
    id: 12,
    name: 'Kārklu ielas otra daļa',
    profileId: 1,
    parentId: 10,
    children: [],
    created: new Date(2021, 1)
  }
];
