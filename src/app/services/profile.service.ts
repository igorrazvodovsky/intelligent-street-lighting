import { Injectable } from '@angular/core';
import { Profile } from '../types';
import { PROFILES } from '~local/../assets/data/profiles';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _profiles = of(PROFILES)

  public get Profiles(): Observable<Profile[]> {
    return this._profiles
  }

  constructor(private messageService: MessageService) { }

  getProfile(id: number | string) {
    return this._profiles.pipe(
      map((profiles: Profile[]) => profiles.find(profile => profile.id === +id)!)
    );
  }
}
