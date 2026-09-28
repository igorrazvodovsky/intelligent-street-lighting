import { Component } from '@angular/core';
import { DeviceService } from '~local/services/device.service';
import { TaskService } from '~local/services/task.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {
  stats$ = combineLatest([this.deviceService.Devices, this.taskService.getTasks()]).pipe(
    map(([devices, tasks]) => ({
      inactiveDevices: devices.filter(device => device.status !== 'active').length,
      newTasks: tasks.filter(task => task.status === 'New').length,
      resolvedTasks: tasks.filter(task => task.status === 'Resolved').length,
    }))
  );

  constructor(private deviceService: DeviceService, private taskService: TaskService) { }

}
