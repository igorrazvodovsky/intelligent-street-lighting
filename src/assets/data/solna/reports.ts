import { ReportGroup } from '~local/types';

// Dimming economy per top-level group, in %, for the last four complete months,
// latest first. Hours, lamps and energy are derived from the city's night
// length and devices, see reports.component.ts.
export const REPORT_GROUPS: ReportGroup[] = [
  { groupId: 101, economy: [30, 34, 34, 34] }, // Skytteholm
  { groupId: 102, economy: [42, 45, 45, 43] }, // Råsunda
  { groupId: 103, economy: [42, 46, 48, 44] }, // Hagalund
  { groupId: 104, economy: [40, 46, 46, 43] }, // Huvudsta
  { groupId: 105, economy: [51, 54, 55, 52] }, // Järva
  { groupId: 106, economy: [22, 23, 27, 26] }, // Arenastaden
  { groupId: 107, economy: [3, 3, 1, 4] }, // Karolinska
  { groupId: 108, economy: [31, 31, 32, 34] }, // Bergshamra
];
