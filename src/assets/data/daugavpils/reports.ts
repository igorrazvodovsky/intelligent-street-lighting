import { ReportGroup } from '~local/types';

// Dimming economy per top-level group, in %, for the last four complete months,
// latest first. Hours, lamps and energy are derived from the city's night
// length and devices, see reports.component.ts. Autoosta was commissioned two
// months ago, so it has no data for earlier months.
export const REPORT_GROUPS: ReportGroup[] = [
  { groupId: 1, economy: [32, 33, 35, 29] }, // Dzelzceļnieks
  { groupId: 2, economy: [20, 25, 26, 23] }, // Cietoksnis
  { groupId: 3, economy: [41, 46, null, null] }, // Autoosta
];
