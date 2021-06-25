import { Component, OnInit, Input } from '@angular/core';
import { Task, Device } from '../../../../types'
import { TaskService } from '../../../../services/task.service';

@Component({
  selector: 'device-overview',
  templateUrl: './device-overview.component.html',
  styleUrls: ['./device-overview.component.scss']
})
export class DeviceOverviewComponent implements OnInit {
  @Input() device!: Device;
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTask(1)
      .subscribe(task => this.tasks[0] = task);
  }

}
