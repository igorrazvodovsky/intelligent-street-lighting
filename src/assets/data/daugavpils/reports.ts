import { ReportGroup } from '~local/types';

// Last four months per top-level group: Total, Aug, Jul, Jun, May.
// Hours follow dusk-to-dawn length at the city's latitude, nominal energy is
// lamps × hours × 0.08 kWh, and real energy applies the group's dimming economy.
// Autoosta was commissioned in July, so it has no data for earlier months.
export const REPORT_GROUPS: ReportGroup[] = [
  {
    group: 'Dzelzceļnieks',
    lamps: 23,
    data: {
      h: [895, 286, 205, 164, 240],
      nominal: [1647, 526, 377, 302, 442],
      real: [1121, 358, 253, 196, 314],
      economy: [32, 32, 33, 35, 29],
    }
  },
  {
    group: 'Cietoksnis',
    lamps: 9,
    data: {
      h: [900, 285, 207, 165, 243],
      nominal: [648, 205, 149, 119, 175],
      real: [499, 164, 112, 88, 135],
      economy: [23, 20, 25, 26, 23],
    }
  },
  {
    group: 'Autoosta',
    lamps: 17,
    data: {
      h: [490, 285, 205, null, null],
      nominal: [667, 388, 279, null, null],
      real: [380, 229, 151, null, null],
      economy: [43, 41, 46, null, null],
    }
  }
];
