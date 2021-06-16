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

export interface Alert {
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

export interface DeviceGroup {
  id: number,
  name: string;
  lamps: number;
  profileId: number;
}

export interface Activity {
  type: string;
  subject: string;
  details: string;
  object: object;
  avatar?: string;
  created: Date;
}

export interface Device {
  id: number;
  name: string;
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

export interface Profile {
  id: number,
  name: string,
  description: string,
  summary:
    {
      day: string,
      schedule: {
        brightness: number,
        time: string
      }[]
    }[],
  settings:
    {
      name: string,
      brightness: number,
      schedule: {
        day: string,
        time: {
          start: string,
          end: string
        }[]
      }[]
    }[],
  naturalLight: boolean,
  sun: boolean,
  motionSensor: boolean,
  parentId: number | null
}
