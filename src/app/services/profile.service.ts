import { Injectable } from '@angular/core';
import { Profile } from '../types';
import { PROFILES as DAUGAVPILS_PROFILES } from '~local/../assets/data/daugavpils/profiles';
import { PROFILES as SOLNA_PROFILES } from '~local/../assets/data/solna/profiles';
import { DeviceService } from './device.service';
import { MessageService } from './message.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { cityScoped } from './city-scoped';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private cityProfilesMap: { [key: string]: Profile[] } = {
    'daugavpils': DAUGAVPILS_PROFILES,
    'solna': SOLNA_PROFILES,
  };

  private _profiles = cityScoped(this.deviceService.activeCity$, this.cityProfilesMap, SOLNA_PROFILES)

  public get Profiles(): Observable<Profile[]> {
    return this._profiles
  }

  constructor(private deviceService: DeviceService, private messageService: MessageService) { }

  getProfile(id: number | string) {
    return this._profiles.pipe(
      map((profiles: Profile[]) => profiles.find(profile => profile.id === +id)!)
    );
  }

  // Built from the union of every city's profile ids, so the colour scale stays
  // consistent even if one city's catalogue diverges from another's.
  getProfileColour = d3Scale
    .scaleOrdinal(d3ScaleChromatic.schemeCategory10)
    .domain([...new Set([...DAUGAVPILS_PROFILES, ...SOLNA_PROFILES].map((p: any) => p.id))])

}
