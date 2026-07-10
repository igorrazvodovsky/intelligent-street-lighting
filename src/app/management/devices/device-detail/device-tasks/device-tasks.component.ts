import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Task } from '~local/types'
import { TaskService } from '~local/services/task.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'device-tasks',
  templateUrl: './device-tasks.component.html',
  styleUrls: ['./device-tasks.component.scss']
})

export class DeviceTasksComponent implements OnInit, OnDestroy {
  @Input() deviceId: number
  tasks: Task[]
  activeTasks: Task[] = []
  private destroy$ = new Subject<void>();
  constructor(private service: TaskService) { }

  ngOnInit() {
    this.service.getTasksByDevice(this.deviceId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => {
        this.tasks = tasks
        this.activeTasks = tasks.filter(task => task.status !== 'Closed')
      }
      );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getTasks(): void {

  }

}
