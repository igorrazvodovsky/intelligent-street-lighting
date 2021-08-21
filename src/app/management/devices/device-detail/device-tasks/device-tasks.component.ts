import { Component, OnInit, Input } from '@angular/core';
import { Task } from '~local/types'
import { TaskService } from '~local/services/task.service';

@Component({
  selector: 'device-tasks',
  templateUrl: './device-tasks.component.html',
  styleUrls: ['./device-tasks.component.scss']
})

export class DeviceTasksComponent implements OnInit {
  @Input() deviceId: number
  tasks: Task[]
  activeTasks: Task[] = []
  constructor(private service: TaskService) { }

  ngOnInit() {
    this.service.getTasksByDevice(this.deviceId)
      .subscribe(tasks => {
        this.tasks = tasks
        this.activeTasks = tasks.filter(task => task.status !== 'Closed')
      }
      );
  }

  getTasks(): void {

  }

}
