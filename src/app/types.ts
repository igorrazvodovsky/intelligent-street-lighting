// import { WeekDay } from '@angular/common';

export interface User {
  name: string;
  id: number;
  status: string;
  enabled: boolean;
  locked: boolean;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  device: string;
  eventId: number;
  assignee: string;
  created: Date;
  updated: Date;
  comments: any;
}

export interface Comment {
  id: number;
  author: any;
  comment: string;
  created: Date;
}

export interface DeviceGroup {
  id: number,
  name: string,
  profileId: number,
  parent: number
}

// TODO: Alert → DeviceEvent +critical
// TODO: REMOVE
export interface Alert {
  id: number,
  title: string,
  description?: string,
  status: string,
  priority: string,
  device: string,
  eventId: number,
  assignee: string,
  created: Date,
  updated: Date,
  comments: any
}

export interface Event {
  id: number,
  created: Date,
  type: 'device' | 'user',
}

export interface UserEvent extends Event {
  userId: number,
  deviceId: number,
  action: 'update',
  property: string,
  from: any,
  to: any
}

export interface DeviceEvent extends Event {
  deviceId: number,
  value: string,
  title: string,
  description?: string,
  level: 'critical' | 'warning' | 'info' | 'success',
  taskId?: number
}

export enum SensorType {
  Motion = "motion sensor",
  Wifi = 'wifi senspor',
  Traffic = 'trafic sensor'
}

export enum DeviceType {
  Lamp,
  SegmentController,
}

export interface Device {
  id: number,
  name: string,
  model: string,
  groupId: number,
  profileId?: number,
  alerts?: Alert[],
  events?: [],
  tasks?: Task[],
  properties?: object,
  sensors?: SensorType[],
  metrics?: object,
  surgeProtector: boolean,
  orientation: number,
  firmware: string
}

export interface MotionSensor {
  id: number,
  status: boolean,
  sensitivity: number,
  friends: []
}

export interface MeasurementGroup {
  name: string,
  measurements: Measurement[]
}

export interface Measurement {
  name: string,
  units: string,
  values: [
    {
      value: number,
      date: Date
    }
  ],
  thresholds: {
    min?: number,
    max?: number
  }
}

// TODO: Sunday or Monday?
export enum WeekDay {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

export interface Schedule {
  name?: string,
  brightness: number,
  time: {
    start: Date,
    end: Date,
    week: {
      enabled?: boolean,
      start?: Date,
      end?: Date
    }[]
  }
}

export interface TimeGroup {
  days: number[],
  start: Date,
  end: Date
}

export interface Profile {
  id: number,
  name: string,
  description?: string,
  summary:
  {
    day: string,
    schedule: {
      brightness: number,
      time: string
    }[],
  }[],
  schedules: Schedule[],
  naturalLight: boolean,
  sun: boolean,
  motionSensor: boolean,
  parentId: number | null
}
