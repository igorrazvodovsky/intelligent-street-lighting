import { Injectable } from '@angular/core';
import { User } from '../types';
import { USERS } from '~local/../assets/data/users';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users = of(USERS)

  public get Users(): Observable<User[]> {
    return this._users
  }

  constructor(private messageService: MessageService) { }

  getUser(id: number | string) {
    this.messageService.add('User service: fetched user ' + id);
    return this._users.pipe(
      map((users: User[]) => users.find(user => user.id === +id)!)
    );
  }
}
