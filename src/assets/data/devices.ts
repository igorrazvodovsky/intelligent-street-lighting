import { Device, DeviceGroup } from '../../app/types';

export const DEVICES: Device[] = [
  { id: 11, name: '01-01' },
  { id: 12, name: '01-02' },
  { id: 13, name: '01-03' },
  { id: 14, name: '01-04' },
  { id: 15, name: '01-05' },
  { id: 16, name: '01-06' },
  { id: 17, name: '01-07' },
  { id: 18, name: '01-08' },
  { id: 19, name: '01-09' },
  { id: 20, name: '01-10' }
];

export const GROUPS: DeviceGroup[] = [
    {
      id: 1,
      name: 'Dzelzceļnieks',
      lamps: 67,
      profileId: 1
    },
    {
      id: 2,
      name: 'Cietoksnis',
      lamps: 12,
      profileId: 2
    },
    {
      id: 3,
      name: 'Autoosta',
      lamps: 5,
      profileId: 2
  },
  {
    id: 4,
    name: 'Group 3',
    lamps: 18,
    profileId: 1
  },
  {
    id: 5,
    name: 'Lokomotīve',
    lamps: 25,
    profileId: 3
  },
  {
    id:  6,
    name: 'Dzelzceļnieks',
    lamps: 67,
    profileId: 2
  },
  {
    id: 7,
    name: 'Cietoksnis',
    lamps: 12,
    profileId: 1
  },
  {
    id: 8,
    name: 'Autoosta',
    lamps: 5,
    profileId: 1
  },
  {
    id: 9,
    name: 'Group 3',
    lamps: 18,
    profileId: 1
  },
  {
    id: 10,
    name: 'Lokomotīve',
    lamps: 25,
    profileId: 1
  }
  ];
