import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { Task, Comment } from '../../../types'

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
      assignee: 'Niall Mercado',
      created: new Date('1/1/16'),
      updated: new Date('1/1/16'),
      comments: [
        {
          id: 1,
          author: 'John',
          comment: 'On my way.',
          created: new Date('1/1/16'),
        },
        {
          id: 2,
          author: 'Mary',
          comment: 'I am not doing this.',
          created: new Date('1/1/16'),
        }
      ]
    },
    {
      id: 2,
      title: 'Fix communication failure',
      status: 'New',
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
      {
      id: 4,
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
      id: 5,
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
  constructor(public dialog: MatDialog) {}
  openDialog(task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      id: 'task-dialog',
      data: { task: task },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }

}
