import { ReportGroup } from '~local/types';

// Last four months per top-level group: Total, Aug, Jul, Jun, May.
// Hours follow dusk-to-dawn length at the city's latitude, nominal energy is
// lamps × hours × 0.08 kWh, and real energy applies the group's dimming economy.
export const REPORT_GROUPS: ReportGroup[] = [
  {
    group: 'Skytteholm',
    lamps: 28,
    data: {
      h: [727, 256, 153, 113, 205],
      nominal: [1628, 573, 343, 253, 459],
      real: [1097, 401, 226, 167, 303],
      economy: [33, 30, 34, 34, 34],
    }
  },
  {
    group: 'Råsunda',
    lamps: 58,
    data: {
      h: [728, 257, 154, 112, 205],
      nominal: [3378, 1192, 715, 520, 951],
      real: [1912, 691, 393, 286, 542],
      economy: [43, 42, 45, 45, 43],
    }
  },
  {
    group: 'Hagalund',
    lamps: 18,
    data: {
      h: [726, 255, 154, 114, 203],
      nominal: [1045, 367, 222, 164, 292],
      real: [582, 213, 120, 85, 164],
      economy: [44, 42, 46, 48, 44],
    }
  },
  {
    group: 'Huvudsta',
    lamps: 23,
    data: {
      h: [722, 255, 152, 110, 205],
      nominal: [1328, 469, 280, 202, 377],
      real: [756, 281, 151, 109, 215],
      economy: [43, 40, 46, 46, 43],
    }
  },
  {
    group: 'Järva',
    lamps: 12,
    data: {
      h: [725, 255, 154, 114, 202],
      nominal: [696, 245, 148, 109, 194],
      real: [330, 120, 68, 49, 93],
      economy: [53, 51, 54, 55, 52],
    }
  },
  {
    group: 'Arenastaden',
    lamps: 13,
    data: {
      h: [724, 254, 155, 112, 203],
      nominal: [752, 264, 161, 116, 211],
      real: [571, 206, 124, 85, 156],
      economy: [24, 22, 23, 27, 26],
    }
  },
  {
    group: 'Karolinska',
    lamps: 12,
    data: {
      h: [725, 256, 154, 113, 202],
      nominal: [696, 246, 148, 108, 194],
      real: [676, 239, 144, 107, 186],
      economy: [3, 3, 3, 1, 4],
    }
  },
  {
    group: 'Bergshamra',
    lamps: 15,
    data: {
      h: [724, 254, 154, 110, 206],
      nominal: [869, 305, 185, 132, 247],
      real: [591, 210, 128, 90, 163],
      economy: [32, 31, 31, 32, 34],
    }
  }
];
