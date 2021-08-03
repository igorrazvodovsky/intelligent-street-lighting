import { Device, DeviceGroup, SensorType } from '~local/types';

export const DEVICES: Device[] = [
  {
    id: 11,
    name: '01-01',
    groupId: 1,
    model: 'LC2M2305R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false,
    sensors: [SensorType.Motion, SensorType.Traffic]
  },
  {
    id: 12,
    name: '01-02',
    groupId: 1,
    model: 'MSLC205RL',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: true,
    sensors: [SensorType.Motion]
  },
  {
    id: 13,
    name: '01-03',
    groupId: 1,
    model: 'MSLC205RL',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: true
  },
  {
    id: 14,
    name: '01-04',
    groupId: 1,
    model: 'NLC2M1205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false,
    sensors: [SensorType.Traffic]
  },
  {
    id: 15,
    name: '01-05',
    groupId: 1,
    model: 'LC2M2305R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: true
  },
  {
    id: 16,
    name: '01-06',
    groupId: 1,
    model: 'NLC2M1205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 17,
    name: '01-07',
    groupId: 1,
    model: 'LC2M2305R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: true
  },
  {
    id: 18,
    name: '01-08',
    groupId: 1,
    model: 'LC2M2305R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false,
    sensors: [SensorType.Wifi]
  },
  {
    id: 19,
    name: '01-09',
    groupId: 1,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 20,
    name: '02-01',
    groupId: 2,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 21,
    name: '02-21',
    groupId: 2,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 22,
    name: '02-22',
    groupId: 2,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 23,
    name: '02-23',
    groupId: 2,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 24,
    name: '02-24',
    groupId: 2,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 25,
    name: '02-25',
    groupId: 2,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 26,
    name: '02-26',
    groupId: 2,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 27,
    name: '02-27',
    groupId: 2,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 28,
    name: '02-28',
    groupId: 2,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 29,
    name: '02-29',
    groupId: 2,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 30,
    name: '02-30',
    groupId: 2,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 31,
    name: '03-01',
    groupId: null,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 32,
    name: '03-02',
    groupId: null,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 33,
    name: '03-03',
    groupId: null,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
  {
    id: 34,
    name: '03-04',
    groupId: null,
    model: 'Z8LC205R',
    orientation: 90,
    firmware: '0.1.0',
    surgeProtector: false
  },
];

export const GROUPS: DeviceGroup[] = [
  {
    id: 1,
    name: 'Dzelzceļnieks',
    profileId: 1,
    parentId: null
  },
  {
    id: 2,
    name: 'Cietoksnis',
    profileId: 2,
    parentId: null
  },
  {
    id: 3,
    name: 'Autoosta',
    profileId: 2,
    parentId: null
  },
  {
    id: 4,
    name: 'Čerepova',
    profileId: 1,
    parentId: null
  },
  {
    id: 5,
    name: 'Lokomotīve',
    profileId: 3,
    parentId: null
  },
  {
    id: 6,
    name: 'Mark Rothko Center',
    profileId: 2,
    parentId: null
  },
  {
    id: 7,
    name: 'Svēto mocekļu Borisa un Gļeba pareizticīgo katedrāle',
    profileId: 1,
    parentId: null
  },
  {
    id: 8,
    name: 'Liginiški',
    profileId: 1,
    parentId: null
  },
  {
    id: 9,
    name: 'Skate park',
    profileId: 1,
    parentId: null
  },
  {
    id: 10,
    name: 'Kārklu iela',
    profileId: 1,
    parentId: null
  },
  {
    id: 11,
    name: 'Kārklu ielas otra daļa',
    profileId: 1,
    parentId: 10
  }
];
