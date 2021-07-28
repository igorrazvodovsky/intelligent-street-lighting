import { Component, Input } from '@angular/core';
import { Task } from '../../types'
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Input() deviceInfo: boolean = true;
  constructor(public dialog: MatDialog) { }

  openDialog(task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      id: 'task-dialog',
      data: { task: task },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
