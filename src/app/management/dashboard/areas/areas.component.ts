import { Component } from '@angular/core';
import { AREA as DAUGAVPILS_AREA } from '~local/../assets/data/daugavpils/area-energy';
import { AREA as SOLNA_AREA } from '~local/../assets/data/solna/area-energy';
import { AREA_NAMES as DAUGAVPILS_AREA_NAMES } from '~local/../assets/data/daugavpils/area-names';
import { AREA_NAMES as SOLNA_AREA_NAMES } from '~local/../assets/data/solna/area-names';
import { DeviceService } from '~local/services/device.service'
import { CityService } from '~local/services/city.service'
import { cityScoped } from '~local/services/city-scoped'
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

const AREAS_MAP: { [key: string]: any[][] } = {
  'daugavpils': DAUGAVPILS_AREA,
  'solna': SOLNA_AREA,
};

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
  data$ = cityScoped(this.cityService.activeCity$, AREAS_MAP)
  areas$ = cityScoped(this.cityService.activeCity$, AREA_NAMES_MAP)

  // Lamps whose group isn't in the active city's group list
  unassignedLamps$ = combineLatest([this.deviceService.Devices, this.deviceService.Groups]).pipe(
    map(([devices, groups]) => {
      const groupIds = new Set(groups.map(group => group.id));
      return devices.filter(device => device.type.toLowerCase() === 'lamp' && !groupIds.has(device.groupId)).length;
    })
  )

  constructor(private deviceService: DeviceService, private cityService: CityService) { }

}
