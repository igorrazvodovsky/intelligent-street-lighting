import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { Task } from '../../../types'
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask?: Task;

  constructor(public dialog: MatDialog, private taskService: TaskService) {}
  openDialog(task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      id: 'task-dialog',
      data: { task: task },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    this.getTasks();
  }

  onSelect(hero: Task): void {
    this.selectedTask = hero;
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

}
