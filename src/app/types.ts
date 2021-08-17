export interface User {
  name: string
  id: number
  status: string
  enabled: boolean
  locked: boolean
}

// TODO: Assignee → userId
export interface Task {
  id: number
  title: string
  description?: string
  status: 'New' | 'In progress' | 'Resolved' | 'Rejected' | 'Closed'
  priority: 'Low' | 'High' | 'Normal'
  deviceId: number
  eventId?: number
  assignee: string
  created: Date
  updated: Date
  comments: any
}

export interface Comment {
  id: number
  author: any
  comment: string
  created: Date
}

export interface DeviceGroup {
  id: number
  name: string
  profileId: number
  parentId: number
  children: number[]
  created: Date
}

export interface Event {
  id: number
  created: Date
  type: 'device' | 'user'
}

export interface UserEvent extends Event {
  userId: number
  deviceId: number
  action: 'update'
  property: string
  from: any
  to: any
}

export interface DeviceEvent extends Event {
  deviceId: number
  value: string
  title: string
  description?: string
  level: 'critical' | 'warning' | 'info' | 'success'
  taskId?: number
}

export type SensorType = "motion" | 'wifi' | 'traffic'

type DeviceType = "Lamp" | "SegmentController"

// TBD: Status of a response can be calculated from latest response date
// 'status' is (temp.) summary of all other statuses
export interface Device {
  id: number
  status?: 'active' | 'warning' | 'danger' | 'off'
  statusOn?: boolean
  statusActive?: boolean
  statusResponding?: boolean
  name: string
  model: string
  groupId: number
  profileId?: number
  type: 'lamp' | 'sc'
  // TODO: Narrow the type to 'level'='critical'
  events?: DeviceEvent[]
  tasks?: Task[]
  properties?: object
  sensors?: SensorType[]
  metrics?: object
  surgeProtector: boolean
  // TODO: lamps only
  orientation?: number
  firmware: string
}

export interface MotionSensor {
  id: number
  status: boolean
  sensitivity: number
  friends: []
}

export interface MeasurementGroup {
  name: string,
  measurements: Measurement[]
}

export interface Measurement {
  name: string
  units: string
  values: [
    {
      value: number
      date: Date
    }
  ],
  thresholds: {
    min?: number
    max?: number
  }
}

export interface Schedule {
  name?: string
  brightness: number
  time: {
    start: Date
    end: Date
    week: {
      enabled?: boolean
      start?: Date
      end?: Date
    }[]
  }
}

export interface TimeGroup {
  days: number[]
  start: Date
  end: Date
}

export interface Profile {
  id: number
  name: string
  description?: string
  summary:
  {
    day: string
    schedule: {
      brightness: number
      time: string
    }[],
  }[],
  schedules: Schedule[]
  naturalLight: boolean
  sun: boolean
  motionSensor: boolean
  parentId: number | null
}
