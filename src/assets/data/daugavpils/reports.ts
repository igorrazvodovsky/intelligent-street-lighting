import { ReportGroup } from '~local/types';

// Dimming economy per top-level group, in %, for the last four complete months,
// latest first. Hours, lamps and energy are derived from the city's night
// length and devices, see reports.component.ts. Autoosta was commissioned two
// months ago, so it has no data for earlier months.
export const REPORT_GROUPS: ReportGroup[] = [
  { groupId: 1, economy: [32, 33, 35, 29] }, // Dzelzceļnieks
  { groupId: 2, economy: [20, 25, 26, 23] }, // Cietoksnis
  { groupId: 3, economy: [41, 46, null, null] }, // Autoosta
  { groupId: 4, economy: [38, 41, 40, 37] }, // Čerepova
  { groupId: 5, economy: [44, 47, 48, 45] }, // Lokomotīve
  { groupId: 6, economy: [18, 20, 21, 19] }, // Mark Rothko Center
  { groupId: 7, economy: [12, 14, 15, 13] }, // Cathedral
  { groupId: 8, economy: [36, 39, 38, 35] }, // Liginiški
  { groupId: 9, economy: [51, 53, 55, 50] }, // Skate park
  { groupId: 10, economy: [40, 42, 43, 39] }, // Kārklu iela
];
