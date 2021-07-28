import { Injectable } from '@angular/core';
import { Task } from '../types';
import { TASKS } from '../../assets/data/tasks';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private messageService: MessageService) { }

  getTasks(): Observable<Task[]> {
    const tasks = of(TASKS);
    this.messageService.add('DeviceService: fetched tasks');
    return tasks;
  }

  getTask(id: number | string) {
    return this.getTasks().pipe(
      // (+) before `id` turns the string into a number
      map((tasks: Task[]) => tasks.find(task => task.id === +id)!)
    );
  }

  getTasksByDevice(id: number | string) {
    return this.getTasks().pipe(
      map((tasks: Task[]) => tasks.filter(task => task.deviceId === +id)!)
    );
  }
}
