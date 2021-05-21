import { Component, OnInit } from '@angular/core';

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
  comments: [];
}

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [
    {
      id: 1,
      title: 'Fix communication failure',
      status: 'New',
      priority: 'Low',
      device: 'Cīrulīši • Lamp 01-01/02',
      eventId: 1,
      assignee: '',
      created: new Date('1/1/16'),
      updated: new Date('1/1/16'),
      comments: []
    },
    {
      id: 2,
      title: 'Fix communication failure',
      status: 'Rejected',
      priority: 'High',
      device: 'Maļutki • Lamp 02-17/01',
      eventId: 1,
      assignee: '',
      created: new Date('1/1/16'),
      updated: new Date('1/1/16'),
      comments: []
    },
    {
      id: 3,
      title: 'Close the door',
      status: 'New',
      priority: 'Normal',
      device: 'Maļutki • Lamp 01-16/02',
      eventId: 3,
      assignee: '',
      created: new Date('1/1/16'),
      updated: new Date('1/1/16'),
      comments: []
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
