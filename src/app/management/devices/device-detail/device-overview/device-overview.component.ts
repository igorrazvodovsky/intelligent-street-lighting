import { Component, OnInit, Input } from '@angular/core';
import { Task, Device, DeviceEvent } from '~local/types'
import { TaskService } from '~local/services/task.service';
import { EventService } from '~local/services/event.service';

@Component({
  selector: 'device-overview',
  templateUrl: './device-overview.component.html',
  styleUrls: ['./device-overview.component.scss']
})
export class DeviceOverviewComponent implements OnInit {
  @Input() device!: Device;
  tasks: Task[] = [];
  alerts: DeviceEvent[] = [];
  activeTasks: Task[] = [];
  on = true;

  constructor(private taskService: TaskService, private eventService: EventService) { }

  ngOnInit() {
    this.getTasks();
    this.getEvents();
  }

  getTasks(): void {
    this.taskService.getTasksByDevice(this.device.id)
      .subscribe(tasks => {
        this.tasks = tasks;
        this.activeTasks = tasks.filter(task => task.status !== 'Closed')
      }
      );
  }

  getEvents(): void {
    this.eventService.getDeviceEventsForDevice(this.device.id)
      .subscribe(events => this.alerts = events.filter(event => event.level == 'critical' && !event.taskId)
      );
  }

}
