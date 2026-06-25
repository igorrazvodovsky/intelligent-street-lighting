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
    id: 1,
    created: getTime(),
    type: 'device',
    deviceId: 11,
    value: 'lampVoltageTooLow',
    title: 'Voltage is too low',
    level: 'warning'
  },
  {
    id: 2,
    created: getTime(),
    type: 'device',
    deviceId: 11,
    value: 'powerFactorTooLow',
    title: 'Power is too low',
    level: 'critical'
  },
  {
    id: 3,
    created: getTime(),
    type: 'device',
    deviceId: 13,
    value: 'communicationFailure',
    title: 'Communication failure	',
    level: 'info',
    taskId: 1
  },
  {
    id: 4,
    created: getTime(),
    type: 'device',
    deviceId: 16,
    value: 'lampVoltageTooLow',
    title: 'Voltage is too low',
    level: 'warning'
  },
  {
    id: 5,
    created: getTime(),
    type: 'device',
    deviceId: 20,
    value: 'powerFactorTooLow',
    title: 'Power is too low',
    level: 'critical'
  },
  {
    id: 6,
    created: getTime(),
    type: 'device',
    deviceId: 23,
    value: 'communicationFailure',
    title: 'Communication failure	',
    level: 'info',
    taskId: 2
  },
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
    taskId: 1
  },
  {
    id: 22,
    created: getTime(),
    type: 'device',
    deviceId: 248,
    value: 'lampFailure',
    title: 'LED module failure',
    level: 'critical',
    taskId: 2
  },
  {
    id: 23,
    created: getTime(),
    type: 'device',
    deviceId: 282,
    value: 'overheating',
    title: 'Controller overheating',
    level: 'warning'
  },
  {
    id: 24,
    created: getTime(),
    type: 'device',
    deviceId: 300,
    value: 'temperatureHigh',
    title: 'Cabinet temperature above threshold',
    level: 'info'
  },
  {
    id: 25,
    created: getTime(),
    type: 'device',
    deviceId: 225,
    value: 'lampVoltageTooLow',
    title: 'Voltage drop during peak hours',
    level: 'warning'
  },
]

export const USER_EVENTS: UserEvent[] = [
  {
    id: 13,
    created: new Date(),
    type: 'user',
    deviceId: 11,
    userId: 17,
    action: 'update',
    property: 'location',
    from: '49.241934, 12.447425',
    to: '49.241934, 12.447425'
  },
  {
    id: 14,
    created: new Date(),
    type: 'user',
    deviceId: 11,
    userId: 6,
    action: 'update',
    property: 'profile',
    from: 'Default',
    to: 'New'
  },
  {
    id: 15,
    created: getTime(),
    type: 'user',
    deviceId: 12,
    userId: 9,
    action: 'update',
    property: 'location',
    from: '49.241934, 12.447425',
    to: '49.241934, 12.447425'
  },
  {
    id: 16,
    created: getTime(),
    type: 'user',
    deviceId: 19,
    userId: 1,
    action: 'update',
    property: 'workingStatus',
    from: false,
    to: true
  },
  {
    id: 17,
    created: getTime(),
    type: 'user',
    deviceId: 13,
    userId: 2,
    action: 'update',
    property: 'orientation',
    from: 60,
    to: 85
  },
  {
    id: 18,
    created: getTime(),
    type: 'user',
    deviceId: 19,
    userId: 1,
    action: 'update',
    property: 'workingStatus',
    from: false,
    to: true
  },
  {
    id: 19,
    created: getTime(),
    type: 'user',
    deviceId: 13,
    userId: 2,
    action: 'update',
    property: 'orientation',
    from: 60,
    to: 85
  },
  {
    id: 30,
    created: getTime(),
    type: 'user',
    deviceId: 202,
    userId: 3,
    action: 'update',
    property: 'profile',
    from: 'Default',
    to: 'Shopping centre'
  },
  {
    id: 31,
    created: getTime(),
    type: 'user',
    deviceId: 232,
    userId: 8,
    action: 'update',
    property: 'orientation',
    from: 45,
    to: 32
  },
  {
    id: 32,
    created: getTime(),
    type: 'user',
    deviceId: 301,
    userId: 12,
    action: 'update',
    property: 'location',
    from: '59.349200, 18.033000',
    to: '59.350100, 18.034200'
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
    from: 'Shopping centre',
    to: 'Pedestrian crossing'
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
    to: 180
  },
]
