import { UserEvent, DeviceEvent } from '~local/types';

let __offset = 0;
function getTime() {
  __offset += Math.floor(Math.random() * 120) + 5;
  const d = new Date();
  d.setMinutes(d.getMinutes() - __offset);
  return new Date(d);
}


export const DEVICE_EVENTS: DeviceEvent[] = [
  {
    id: 20,
    created: getTime(),
    type: 'device',
    deviceId: 202,
    value: 'lampVoltageTooLow',
    title: 'Voltage fluctuation detected',
    level: 'warning'
  },
  {
    id: 21,
    created: getTime(),
    type: 'device',
    deviceId: 207,
    value: 'communicationFailure',
    title: 'Lost communication with controller',
    level: 'critical',
    taskId: 7
  },
  {
    id: 22,
    created: getTime(),
    type: 'device',
    deviceId: 248,
    value: 'lampFailure',
    title: 'LED module failure',
    level: 'critical',
    taskId: 8
  },
  {
    id: 23,
    created: getTime(),
    type: 'device',
    deviceId: 282,
    value: 'overheating',
    title: 'Controller overheating',
    level: 'warning',
    taskId: 9
  },
  {
    id: 24,
    created: getTime(),
    type: 'device',
    deviceId: 300,
    value: 'temperatureHigh',
    title: 'Cabinet temperature above threshold',
    level: 'info',
    taskId: 10
  },
  {
    id: 25,
    created: getTime(),
    type: 'device',
    deviceId: 225,
    value: 'lampVoltageTooLow',
    title: 'Voltage drop during peak hours',
    level: 'warning',
    taskId: 11
  },
]

// Each change leaves the device as devices.geojson has it now
export const USER_EVENTS: UserEvent[] = [
  {
    id: 30,
    created: getTime(),
    type: 'user',
    deviceId: 202,
    userId: 3,
    action: 'update',
    property: 'profile',
    from: 'Shopping centre',
    to: 'Default'
  },
  {
    id: 31,
    created: getTime(),
    type: 'user',
    deviceId: 232,
    userId: 8,
    action: 'update',
    property: 'orientation',
    from: 32,
    to: 45
  },
  {
    id: 32,
    created: getTime(),
    type: 'user',
    deviceId: 301,
    userId: 12,
    action: 'update',
    property: 'location',
    from: '59.350890, 18.023310',
    to: '59.350977, 18.023465'
  },
  {
    id: 33,
    created: getTime(),
    type: 'user',
    deviceId: 243,
    userId: 5,
    action: 'update',
    property: 'workingStatus',
    from: false,
    to: true
  },
  {
    id: 34,
    created: getTime(),
    type: 'user',
    deviceId: 291,
    userId: 15,
    action: 'update',
    property: 'profile',
    from: 'Pedestrian crossing',
    to: 'Shopping centre'
  },
  {
    id: 35,
    created: getTime(),
    type: 'user',
    deviceId: 281,
    userId: 7,
    action: 'update',
    property: 'orientation',
    from: 90,
    to: 0
  },
]
