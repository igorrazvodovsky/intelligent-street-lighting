import { UserEvent, DeviceEvent } from '~local/types';

function getTime() {
  const from: Date = new Date();
  let to: Date = new Date();
  to.setDate(to.getDate() - 1)
  const fromTime = from.getTime();
  const toTime = to.getTime();
  return new Date(fromTime + Math.random() * (toTime - fromTime));
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
  }
]
