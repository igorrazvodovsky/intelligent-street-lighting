import { Component } from '@angular/core';
import { areaEnergy } from '~local/../assets/data/area-energy';
import { AREA_NAMES as DAUGAVPILS_AREA_NAMES } from '~local/../assets/data/daugavpils/area-names';
import { AREA_NAMES as SOLNA_AREA_NAMES } from '~local/../assets/data/solna/area-names';
import { DeviceService } from '~local/services/device.service'
import { CityService } from '~local/services/city.service'
import { cityScoped } from '~local/services/city-scoped'
import { nightSun } from '~local/management/profiles/profile-detail/sun-times'
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

const AREA_NAMES_MAP: { [key: string]: any[] } = {
  'daugavpils': DAUGAVPILS_AREA_NAMES,
  'solna': SOLNA_AREA_NAMES,
};

@Component({
  selector: 'areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent {
  areas$ = cityScoped(this.cityService.activeCity$, AREA_NAMES_MAP)

  // Today's curve for each area, by the index of its card. Last night's
  // sunrise sets the morning, tonight's sunset the evening.
  data$ = combineLatest([this.cityService.activeCity$, this.areas$]).pipe(
    map(([city, areas]) => {
      const today = new Date();
      const lastNight = nightSun(city, new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1));
      const tonight = nightSun(city, today);
      const night = { ...tonight, sunrise: lastNight.sunrise };
      return areas.map((_, i) => areaEnergy(night, i + 1));
    })
  )

  // Lamps whose group isn't in the active city's group list
  unassignedLamps$ = combineLatest([this.deviceService.Devices, this.deviceService.Groups]).pipe(
    map(([devices, groups]) => {
      const groupIds = new Set(groups.map(group => group.id));
      return devices.filter(device => device.type.toLowerCase() === 'lamp' && !groupIds.has(device.groupId)).length;
    })
  )

  constructor(private deviceService: DeviceService, private cityService: CityService) { }

}
