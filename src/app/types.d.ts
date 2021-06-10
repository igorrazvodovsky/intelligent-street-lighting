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
  name: string;
  lamps: number;
  profile: string;
}

export interface Activity {
  type: string;
  subject: string;
  details: string;
  object: {};
  avatar?: string;
  created: Date;
}

export interface Device {
  id: number;
  name: string;
}
