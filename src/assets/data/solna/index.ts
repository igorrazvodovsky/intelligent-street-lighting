import { CityData } from '~local/types';
import { AREA_NAMES } from './area-names';
import { DEVICE_METRICS } from './device-metrics';
import { DEVICE_EVENTS, USER_EVENTS } from './events';
import { GROUPS, MEASUREMENTS } from './groups';
import { REPORT_GROUPS } from './reports';
import { TASKS } from './tasks';

// Devices aren't here: they're fetched from devices.geojson in this folder
export const SOLNA: CityData = {
  groups: GROUPS,
  measurements: MEASUREMENTS,
  metrics: DEVICE_METRICS,
  deviceEvents: DEVICE_EVENTS,
  userEvents: USER_EVENTS,
  tasks: TASKS,
  reports: REPORT_GROUPS,
  areas: AREA_NAMES,
};
