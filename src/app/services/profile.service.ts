import { Injectable } from '@angular/core';
import { Profile } from '../types';
import { PROFILES } from '~local/../assets/data/profiles';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _profiles = of(PROFILES)

  public get Profiles(): Observable<Profile[]> {
    return this._profiles
  }

  constructor(private messageService: MessageService) { }

  // getProfiles(): Observable<Profile[]> {
  //   const profiles = of(PROFILES);
  //   this.messageService.add('ProfileService: fetched profiles');
  //   return profiles;
  // }

  getProfile(id: number | string) {
    return this._profiles.pipe(
      map((profiles: Profile[]) => profiles.find(profile => profile.id === +id)!)
    );
  }
}
