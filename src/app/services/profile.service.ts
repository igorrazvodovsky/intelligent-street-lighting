import { Injectable } from '@angular/core';
import { Profile } from '../types';
import { PROFILES } from '~local/../assets/data/profiles';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Array from 'd3-array';

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

  getProfileColour = d3Scale
    .scaleOrdinal(d3ScaleChromatic.schemeCategory10)
    .domain(PROFILES.map((p: any) => p.id))
    // .domain(d3Array.extent(PROFILES, (d:any) => d.id))

}
