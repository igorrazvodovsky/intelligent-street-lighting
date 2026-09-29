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

  // Profiles are a catalogue shared by every city, so they aren't city-scoped
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

  // A new profile lights every night fully until someone decides where to dim,
  // so a profile nobody has configured never under-lights a street. Adds to
  // the in-memory catalogue, so it lasts until the page reloads.
  createProfile(name: string): number {
    const id = Math.max(...PROFILES.map(p => p.id)) + 1;
    PROFILES.push({
      id,
      name,
      description: '100% from dusk to dawn',
      dynamic: false,
      isInterpolated: true,
      schedules: [
        { name: 'Dusk to dawn', brightness: 1, time: { start: new Date(0, 0, 0, 0), end: new Date(0, 0, 0, 24), week: Array.from({ length: 7 }, () => ({ enabled: true })) } },
      ],
      schedulesDynamic: [],
      naturalLight: true,
      sun: true,
      motionSensor: false,
      parentId: null
    });
    return id;
  }

  private profileColourScale = d3Scale
    .scaleOrdinal(d3ScaleChromatic.schemeCategory10)
    .domain(PROFILES.map(p => String(p.id)))

  // Callers pass ids as numbers or strings, so key the scale on strings
  getProfileColour = (id: number | string): string => this.profileColourScale(String(id))

}
