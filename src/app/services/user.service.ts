import { Injectable } from '@angular/core';
import { User } from '../types';
import { USERS as DAUGAVPILS_USERS } from '~local/../assets/data/daugavpils/users';
import { USERS as SOLNA_USERS } from '~local/../assets/data/solna/users';
import { DeviceService } from './device.service';
import { MessageService } from './message.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private cityUsersMap: { [key: string]: User[] } = {
    'daugavpils': DAUGAVPILS_USERS,
    'solna': SOLNA_USERS,
  };

  private _users = this.deviceService.activeCity$.pipe(
    map(city => this.cityUsersMap[city.id] ?? SOLNA_USERS)
  )

  public get Users(): Observable<User[]> {
    return this._users
  }

  constructor(private deviceService: DeviceService, private messageService: MessageService) { }

  getUser(id: number | string) {
    this.messageService.add('User service: fetched user ' + id);
    return this._users.pipe(
      map((users: User[]) => users.find(user => user.id === +id)!)
    );
  }
}
