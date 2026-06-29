import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Task } from '~local/types'
import { TaskService } from '~local/services/task.service';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  tasks: Task[] = [];
  selectedTask?: Task;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  onSelect(task: Task): void {
    this.selectedTask = task;
  }

  trackByTaskId(_index: number, task: Task) {
    return task.id;
  }

  getTasks(): void {
    this.taskService.getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => this.tasks = tasks);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
