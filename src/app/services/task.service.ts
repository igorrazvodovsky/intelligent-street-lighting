import { Injectable } from '@angular/core';
import { Task } from '../types';
import { CityService } from './city.service';
import { MessageService } from './message.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _tasks = this.cityService.data('tasks')

  constructor(
    private cityService: CityService,
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
