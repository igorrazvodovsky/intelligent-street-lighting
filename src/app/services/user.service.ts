import { Injectable } from '@angular/core';
import { User } from '../types';
import { USERS } from '../../assets/data/users';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private messageService: MessageService) { }

  getUsers(): Observable<User[]> {
    const users = of(USERS);
    this.messageService.add('User service: fetched users');
    return users;
  }

  getUser(id: number | string) {
    return this.getUsers().pipe(
      map((users: User[]) => users.find(user => user.id === +id)!)
    );
  }
}
