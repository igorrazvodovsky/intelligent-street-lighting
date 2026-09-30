import { UserEvent, DeviceEvent } from '~local/types';

let __offset = 0;
function getTime() {
  __offset += Math.floor(Math.random() * 120) + 5;
  const d = new Date();
  d.setMinutes(d.getMinutes() - __offset);
  return new Date(d);
}

// Ids stay clear of Solna's (20–35), so one city's events never stand in for
// the other's
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
    title: 'Communication failure',
    level: 'critical',
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
    title: 'Communication failure',
    level: 'info'
  },
  {
    id: 7,
    created: getTime(),
    type: 'device',
    deviceId: 66,
    value: 'lampFailure',
    title: 'LED module failure',
    level: 'critical',
    taskId: 15
  },
  {
    id: 8,
    created: getTime(),
    type: 'device',
    deviceId: 11,
    value: 'doorOpen',
    title: 'Cabinet door open',
    level: 'warning',
    taskId: 3
  },
  {
    id: 9,
    created: getTime(),
    type: 'device',
    deviceId: 74,
    value: 'communicationFailure',
    title: 'Lost communication with controller',
    level: 'critical'
  },
  {
    id: 10,
    created: getTime(),
    type: 'device',
    deviceId: 116,
    value: 'noPower',
    title: 'No power supply',
    description: 'The lamp reports no mains voltage.',
    level: 'critical',
    taskId: 16
  },
  {
    id: 11,
    created: getTime(),
    type: 'device',
    deviceId: 85,
    value: 'lampVoltageTooLow',
    title: 'Voltage fluctuation detected',
    level: 'warning'
  },
  {
    id: 12,
    created: getTime(),
    type: 'device',
    deviceId: 11,
    value: 'gsmSignalLow',
    title: 'Poor GSM signal',
    level: 'warning',
    taskId: 2
  },
]

export const USER_EVENTS: UserEvent[] = [
  {
    id: 13,
    created: getTime(),
    type: 'user',
    deviceId: 11,
    userId: 17,
    action: 'update',
    property: 'location',
    from: '55.906420, 26.522870',
    to: '55.906548, 26.523120'
  },
  {
    id: 14,
    created: getTime(),
    type: 'user',
    deviceId: 11,
    userId: 6,
    action: 'update',
    property: 'profile',
    from: 'Default',
    to: 'Residential'
  },
  {
    id: 15,
    created: getTime(),
    type: 'user',
    deviceId: 12,
    userId: 9,
    action: 'update',
    property: 'location',
    from: '55.906390, 26.523310',
    to: '55.906506, 26.523539'
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
    deviceId: 70,
    userId: 13,
    action: 'update',
    property: 'profile',
    from: 'Default',
    to: 'Residential'
  },
  {
    id: 19,
    created: getTime(),
    type: 'user',
    deviceId: 94,
    userId: 4,
    action: 'update',
    property: 'orientation',
    from: 0,
    to: 45
  },
]
