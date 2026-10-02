import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { areaEnergy, EnergyReading } from '~local/../assets/data/area-energy';
import { nightSun } from '~local/management/profiles/profile-detail/sun-times';
import { AreaSummary } from '../types';
import { CityService } from './city.service';
import { DeviceService } from './device.service';
import { lamps } from './device-tree';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private _areas = this.cityService.data('areas')

  public get Areas(): Observable<AreaSummary[]> {
    return this._areas
  }

  // Today's curve for each area, in the order of Areas. Last night's sunrise
  // sets the morning, tonight's sunset the evening.
  todayEnergy$: Observable<EnergyReading[][]> = combineLatest([this.cityService.activeCity$, this._areas]).pipe(
    map(([city, areas]) => {
      const today = new Date();
      const lastNight = nightSun(city, new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1));
      const tonight = nightSun(city, today);
      const night = { ...tonight, sunrise: lastNight.sunrise };
      return areas.map((_, i) => areaEnergy(night, i + 1));
    })
  )

  // Lamps whose group isn't in the active city's group list
  unassignedLamps$: Observable<number> = combineLatest([this.deviceService.Devices, this.deviceService.Groups]).pipe(
    map(([devices, groups]) => {
      const groupIds = new Set(groups.map(group => group.id));
      return lamps(devices).filter(lamp => !groupIds.has(lamp.groupId)).length;
    })
  )

  constructor(private cityService: CityService, private deviceService: DeviceService) { }
}
