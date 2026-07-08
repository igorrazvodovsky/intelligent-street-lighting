import { DeviceGroup, MeasurementGroup } from '~local/types';

export const GROUPS: DeviceGroup[] = [
  {
    id: 101,
    name: 'Skytteholm',
    profileId: 1,
    parentId: null,
    children: [110, 111],
    created: new Date(2020, 8),
    profileLocked: false
  },
  {
    id: 110,
    name: 'Solnavägen',
    profileId: 1,
    parentId: 101,
    children: [],
    created: new Date(2020, 9),
    profileLocked: false
  },
  {
    id: 111,
    name: 'Centrum',
    profileId: 1,
    parentId: 101,
    children: [],
    created: new Date(2020, 9),
    profileLocked: false
  },
  {
    id: 102,
    name: 'Råsunda',
    profileId: 3,
    parentId: null,
    children: [],
    created: new Date(2020, 9),
    profileLocked: true
  },
  {
    id: 103,
    name: 'Hagalund',
    profileId: 3,
    parentId: null,
    children: [],
    created: new Date(2020, 9),
    profileLocked: false
  },
  {
    id: 104,
    name: 'Huvudsta',
    profileId: 3,
    parentId: null,
    children: [112],
    created: new Date(2020, 10),
    profileLocked: false
  },
  {
    id: 112,
    name: 'Strandpromenaden',
    profileId: 4,
    parentId: 104,
    children: [],
    created: new Date(2020, 10),
    profileLocked: false
  },
  {
    id: 105,
    name: 'Järva',
    profileId: 5,
    parentId: null,
    children: [],
    created: new Date(2020, 10),
    profileLocked: false
  },
  {
    id: 106,
    name: 'Arenastaden',
    profileId: 2,
    parentId: null,
    children: [],
    created: new Date(2021, 1),
    profileLocked: false
  },
  {
    id: 107,
    name: 'Karolinska',
    profileId: 4,
    parentId: null,
    children: [],
    created: new Date(2021, 3),
    profileLocked: false
  },
  {
    id: 108,
    name: 'Bergshamra',
    profileId: 1,
    parentId: null,
    children: [],
    created: new Date(2021, 5),
    profileLocked: false
  }
];

export const MEASUREMENTS: MeasurementGroup[] = [
  {
    name: "Controller health",
    measurements: [
      {
        id: 1,
        name: "Communication",
        units: "%",
        thresholds: { min: 50 },
        values: [{ value: 94, date: new Date() }]
      },
      {
        id: 2,
        name: "Temperature",
        units: "°C",
        thresholds: { min: 50 },
        values: [{ value: 14, date: new Date() }]
      }
    ]
  },
  {
    name: "Luminaire",
    measurements: [
      {
        id: 3,
        name: "Brightness",
        units: "%",
        thresholds: { min: 50 },
        values: [{ value: 60, date: new Date() }]
      }
    ]
  },
  {
    name: "Motion sensor",
    measurements: [
      {
        id: 4,
        name: "Counted objects",
        units: "",
        values: [{ value: 10234, date: new Date() }]
      }
    ]
  },
  {
    name: "Energy meter",
    measurements: [
      {
        id: 5,
        name: "Energy",
        units: "kWh",
        values: [{ value: 912.4, date: new Date() }]
      },
      {
        id: 6,
        name: "Operating",
        units: "h",
        values: [{ value: 21850, date: new Date() }]
      },
      {
        id: 7,
        name: "Up time (by controller)",
        units: "h",
        values: [{ value: 48230, date: new Date() }]
      },
      {
        id: 8,
        name: "Burn time (by controller)",
        units: "h",
        values: [{ value: 21790, date: new Date() }]
      }
    ]
  },
  {
    name: "",
    measurements: [
      {
        id: 9,
        name: "Frequency",
        units: "Hz",
        values: [{ value: 50.0, date: new Date() }]
      },
      {
        id: 10,
        name: "Voltage",
        units: "V",
        values: [{ value: 231, date: new Date() }]
      },
      {
        id: 11,
        name: "Current",
        units: "A",
        values: [{ value: 0.21, date: new Date() }]
      },
      {
        id: 12,
        name: "Power factor",
        units: "",
        values: [{ value: 0.95, date: new Date() }]
      },
      {
        id: 13,
        name: "Power",
        units: "W",
        values: [{ value: 46, date: new Date() }]
      }
    ]
  },
  {
    name: "LED",
    measurements: [
      {
        id: 14,
        name: "Voltage",
        units: "V",
        values: [{ value: 145, date: new Date() }]
      },
      {
        id: 15,
        name: "Current",
        units: "A",
        values: [{ value: 0.28, date: new Date() }]
      }
    ]
  }
];
