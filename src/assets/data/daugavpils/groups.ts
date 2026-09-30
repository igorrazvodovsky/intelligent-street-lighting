import { DeviceGroup, MeasurementGroup } from '~local/types';

// Positions of the devices in these groups are approximate. Autoosta was
// commissioned in July 2026, see reports.ts.
export const GROUPS: DeviceGroup[] = [
  {
    id: 1,
    name: 'Dzelzceļnieks',
    profileId: 1,
    parentId: null,
    children: [],
    created: new Date(2021, 1),
    profileLocked: false
  },
  {
    id: 2,
    name: 'Cietoksnis',
    profileId: 2,
    parentId: null,
    children: [],
    created: new Date(2021, 1),
    profileLocked: true
  },
  {
    id: 3,
    name: 'Autoosta',
    profileId: 3,
    parentId: null,
    children: [],
    created: new Date(2026, 6),
    profileLocked: false
  },
  {
    id: 4,
    name: 'Čerepova',
    profileId: 3,
    parentId: null,
    children: [],
    created: new Date(2021, 4),
    profileLocked: false
  },
  {
    id: 5,
    name: 'Lokomotīve',
    profileId: 5,
    parentId: null,
    children: [],
    created: new Date(2021, 8),
    profileLocked: false
  },
  {
    id: 6,
    name: 'Mark Rothko Center',
    profileId: 2,
    parentId: null,
    children: [],
    created: new Date(2022, 3),
    profileLocked: false
  },
  {
    id: 7,
    name: 'Svēto mocekļu Borisa un Gļeba pareizticīgo katedrāle',
    profileId: 1,
    parentId: null,
    children: [],
    created: new Date(2022, 3),
    profileLocked: false
  },
  {
    id: 8,
    name: 'Liginiški',
    profileId: 1,
    parentId: null,
    children: [],
    created: new Date(2023, 2),
    profileLocked: false
  },
  {
    id: 9,
    name: 'Skate park',
    profileId: 5,
    parentId: null,
    children: [],
    created: new Date(2024, 5),
    profileLocked: false
  },
  {
    id: 10,
    name: 'Kārklu iela',
    profileId: 1,
    parentId: null,
    children: [11, 12],
    created: new Date(2025, 4),
    profileLocked: false
  },
  {
    id: 11,
    name: 'Kārklu ielas pirma daļa',
    profileId: 1,
    parentId: 10,
    children: [],
    created: new Date(2025, 4),
    profileLocked: false
  },
  {
    id: 12,
    name: 'Kārklu ielas otra daļa',
    profileId: 1,
    parentId: 10,
    children: [],
    created: new Date(2025, 4),
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
        values: [{ value: 90, date: new Date() }]
      },
      {
        id: 2,
        name: "Temperature",
        units: "°C",
        thresholds: { min: 50 },
        values: [{ value: 23, date: new Date() }]
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
        values: [{ value: 50, date: new Date() }]
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
        values: [{ value: 7781, date: new Date() }]
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
