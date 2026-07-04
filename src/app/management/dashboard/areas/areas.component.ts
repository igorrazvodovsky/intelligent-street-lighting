import { Component, OnInit, OnDestroy } from '@angular/core';
import { AREA as DAUGAVPILS_AREA } from '~local/../assets/data/areas';
import { AREA as SOLNA_AREA } from '~local/../assets/data/solna/areas';
import { AREA_NAMES as DAUGAVPILS_AREA_NAMES } from '~local/../assets/data/daugavpils/area-names';
import { AREA_NAMES as SOLNA_AREA_NAMES } from '~local/../assets/data/solna/area-names';
import { DeviceService } from '~local/services/device.service'
import { Subscription } from 'rxjs';

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
export class AreasComponent implements OnInit, OnDestroy {
  data = DAUGAVPILS_AREA
  areas = AREA_NAMES_MAP['daugavpils']
  unassignedLamps = 14;
  private sub: Subscription

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.sub = this.deviceService.activeCity$.subscribe(city => {
      this.data = AREAS_MAP[city.id] || DAUGAVPILS_AREA;
      this.areas = AREA_NAMES_MAP[city.id] || AREA_NAMES_MAP['daugavpils'];
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

}
