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
    taskId: 4
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
    level: 'info'
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
]
