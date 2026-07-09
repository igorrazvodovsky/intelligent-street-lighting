import { Injectable } from '@angular/core';
import { Task } from '../types';
import { TASKS as DAUGAVPILS_TASKS } from '~local/../assets/data/daugavpils/tasks';
import { TASKS as SOLNA_TASKS } from '~local/../assets/data/solna/tasks';
import { DeviceService } from './device.service';
import { MessageService } from './message.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { cityScoped } from './city-scoped';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private cityTasksMap: { [key: string]: Task[] } = {
    'daugavpils': DAUGAVPILS_TASKS,
    'solna': SOLNA_TASKS,
  };

  private _tasks = cityScoped(this.deviceService.activeCity$, this.cityTasksMap, SOLNA_TASKS)

  constructor(
    private deviceService: DeviceService,
    private messageService: MessageService,
  ) { }

  getTasks(): Observable<Task[]> {
    this.messageService.add('TaskService: fetched tasks');
    return this._tasks;
  }

  getTask(id: number | string): Observable<Task> {
    return this.getTasks().pipe(
      map((tasks: Task[]) => tasks.find(task => task.id === +id)!)
    );
  }

  getTasksByDevice(id: number | string): Observable<Task[]> {
    return this.getTasks().pipe(
      map((tasks: Task[]) => tasks.filter(task => task.deviceId === +id))
    );
  }
}
