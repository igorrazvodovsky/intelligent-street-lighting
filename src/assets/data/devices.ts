import { DeviceGroup, MeasurementGroup } from '~local/types';

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
    created: new Date(2021, 1),
    profileLocked: false
  },
  {
    id: 4,
    name: 'Čerepova',
    profileId: 4,
    parentId: null,
    children: [],
    created: new Date(2021, 1),
    profileLocked: false
  },
  {
    id: 5,
    name: 'Lokomotīve',
    profileId: 5,
    parentId: null,
    children: [],
    created: new Date(2021, 1),
    profileLocked: false
  },
  {
    id: 6,
    name: 'Mark Rothko Center',
    profileId: 2,
    parentId: null,
    children: [],
    created: new Date(2021, 1),
    profileLocked: false
  },
  {
    id: 7,
    name: 'Svēto mocekļu Borisa un Gļeba pareizticīgo katedrāle',
    profileId: 1,
    parentId: null,
    children: [],
    created: new Date(2021, 1),
    profileLocked: false
  },
  {
    id: 8,
    name: 'Liginiški',
    profileId: 1,
    parentId: null,
    children: [],
    created: new Date(2021, 1),
    profileLocked: false
  },
  {
    id: 9,
    name: 'Skate park',
    profileId: 1,
    parentId: null,
    children: [],
    created: new Date(2021, 1),
    profileLocked: false
  },
  {
    id: 10,
    name: 'Kārklu iela',
    profileId: 1,
    parentId: null,
    children: [11, 12],
    created: new Date(2021, 1),
    profileLocked: false
  },
  {
    id: 11,
    name: 'Kārklu ielas pirma daļa',
    profileId: 1,
    parentId: 10,
    children: [],
    created: new Date(2021, 1),
    profileLocked: false
  },
  {
    id: 12,
    name: 'Kārklu ielas otra daļa',
    profileId: 1,
    parentId: 10,
    children: [],
    created: new Date(2021, 1),
    profileLocked: false
  }
];

export const MEASUREMENTS: MeasurementGroup[] = [
  {
    name: "Controller health",
    measurements: [
      {
        name: "Communication",
        units: "%",
        thresholds: {
          min: 50,
        }
      },
      {
        name: "Temperature",
        units: "°C",
        thresholds: {
          min: 50,
        }
      }
    ]
  },
  {
    name: "Luminaire",
    measurements: [
      {
        name: "Brightness",
        units: "%",
        thresholds: {
          min: 50,
        }
      }
    ]
  },
  {
    name: "Motion sensor",
    measurements: [
      {
        name: "Counted objects",
        units: ""
      }
    ]
  },
  {
    name: "Energy meter",
    measurements: [
      {
        name: "Energy",
        units: "kWh"
      },
      {
        name: "Operating",
        units: "h"
      },
      {
        name: "Up time (by controller)",
        units: "h"
      },
      {
        name: "Burn time (by controller)",
        units: "h"
      }
    ]
  },
  {
    name: "",
    measurements: [
      {
        name: "Frequency",
        units: "Hz"
      },
      {
        name: "Voltage",
        units: "V",
      },
      {
        name: "Current",
        units: "A",
      },
      {
        name: "Power factor",
        units: "",
      },
      {
        name: "Power",
        units: "W",
      }
    ]
  },
  {
    name: "LED",
    measurements: [
      {
        name: "Voltage",
        units: "V",
      },
      {
        name: "Current",
        units: "A",
      }
    ]
  }
]

