import { Component, OnInit } from '@angular/core';
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

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  onSelect(task: Task): void {
    this.selectedTask = task;
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

}
