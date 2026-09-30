import { Component, OnChanges, Input } from '@angular/core';
import { Task } from '~local/types'
import { TaskService } from '~local/services/task.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'device-tasks',
  templateUrl: './device-tasks.component.html',
  styleUrls: ['./device-tasks.component.scss']
})

export class DeviceTasksComponent implements OnChanges {
  @Input() deviceId: number
  activeTasks$: Observable<Task[]>
  constructor(private service: TaskService) { }

  // Reused when going from one device to another of the same type
  ngOnChanges() {
    this.activeTasks$ = this.service.getTasksByDevice(this.deviceId).pipe(
      map(tasks => tasks.filter(task => task.status !== 'Closed'))
    );
  }

}
