import { Device, DeviceGroup } from '../../app/types';

export const DEVICES: Device[] = [
  {
    id: 11,
    name: '01-01',
    groupId: 1,
    properties: {
      orientation: 0.9,
      surgeProtector: false,
      firmware: 'v1'
    },

  },
  { id: 12, name: '01-02', groupId: 1 },
  { id: 13, name: '01-03', groupId: 1 },
  { id: 14, name: '01-04', groupId: 1 },
  { id: 15, name: '01-05', groupId: 1 },
  { id: 16, name: '01-06', groupId: 1 },
  { id: 17, name: '01-07', groupId: 1 },
  { id: 18, name: '01-08', groupId: 1 },
  { id: 19, name: '01-09', groupId: 1 },
  { id: 20, name: '02-10', groupId: 2 },
  { id: 21, name: '02-01', groupId: 2 },
  { id: 22, name: '02-02', groupId: 2 },
  { id: 23, name: '02-03', groupId: 2 },
  { id: 24, name: '02-04', groupId: 2 },
  { id: 25, name: '02-05', groupId: 2 },
  { id: 26, name: '02-06', groupId: 2 },
  { id: 27, name: '02-07', groupId: 2 },
  { id: 28, name: '02-08', groupId: 2 },
  { id: 29, name: '02-09', groupId: 2 },
  { id: 30, name: '02-10', groupId: 2 },
  { id: 31, name: '02-07', groupId: null },
  { id: 32, name: '02-08', groupId: null },
  { id: 33, name: '02-09', groupId: null },
  { id: 34, name: '02-10', groupId: null }
];

export const GROUPS: DeviceGroup[] = [
  {
    id: 1,
    name: 'Dzelzceļnieks',
    lamps: null,
    profileId: 1
  },
  {
    id: 2,
    name: 'Cietoksnis',
    lamps: null,
    profileId: 2
  },
  {
    id: 3,
    name: 'Autoosta',
    lamps: null,
    profileId: 2
  },
  {
    id: 4,
    name: 'Čerepova',
    lamps: null,
    profileId: 1
  },
  {
    id: 5,
    name: 'Lokomotīve',
    lamps: null,
    profileId: 3
  },
  {
    id:  6,
    name: 'Mark Rothko Center',
    lamps: null,
    profileId: 2
  },
  {
    id: 7,
    name: 'Svēto mocekļu Borisa un Gļeba pareizticīgo katedrāle',
    lamps: null,
    profileId: 1
  },
  {
    id: 8,
    name: 'Liginiški',
    lamps: null,
    profileId: 1
  },
  {
    id: 9,
    name: 'Skate park',
    lamps: null,
    profileId: 1
  },
  {
    id: 10,
    name: 'Kārklu iela',
    lamps: null,
    profileId: 1
  }
  ];
