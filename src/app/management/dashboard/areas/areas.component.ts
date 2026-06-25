import { Component, OnInit, OnDestroy } from '@angular/core';
import { AREA as DAUGAVPILS_AREA } from '~local/../assets/data/areas';
import { AREA as SOLNA_AREA } from '~local/../assets/data/solna/areas';
import { DeviceService } from '~local/services/device.service'
import { Subscription } from 'rxjs';

const AREAS_MAP: { [key: string]: any[][] } = {
  'daugavpils': DAUGAVPILS_AREA,
  'solna': SOLNA_AREA,
};

const AREA_NAMES_MAP: { [key: string]: any[] } = {
  'daugavpils': [
    { name: "Ventas", children: [], profileId: 1, status: "active", tooltip: "Connection stability: 99%", profiles: 3, lamps: 27 },
    { name: "Tabore", children: [], profileId: 2, status: "active", tooltip: "Connection stability: 98%", profiles: 2, lamps: 18 },
    { name: "Laucese", children: [], profileId: 3, status: "warning", tooltip: "Connection stability: 82%", profiles: 4, lamps: 42 },
    { name: "Otrie Peski", children: [], profileId: 3, status: "active", tooltip: "Connection stability: 96%", profiles: 1, lamps: 12 },
    { name: "Čerepova", children: [], profileId: 1, status: "error", tooltip: "Connection stability: 45%", profiles: 3, lamps: 22 }
  ],
  'solna': [
    { name: "Skytteholm", children: [], profileId: 1, status: "active", tooltip: "Connection stability: 97%", profiles: 4, lamps: 34 },
    { name: "Arenastaden", children: [], profileId: 2, status: "active", tooltip: "Connection stability: 99%", profiles: 5, lamps: 50 },
    { name: "Råsunda", children: [], profileId: 3, status: "active", tooltip: "Connection stability: 95%", profiles: 3, lamps: 25 },
    { name: "Hagalund", children: [], profileId: 3, status: "warning", tooltip: "Connection stability: 85%", profiles: 2, lamps: 15 },
    { name: "Huvudsta", children: [], profileId: 3, status: "active", tooltip: "Connection stability: 92%", profiles: 4, lamps: 40 },
    { name: "Karolinska", children: [], profileId: 4, status: "active", tooltip: "Connection stability: 98%", profiles: 6, lamps: 62 },
    { name: "Järva", children: [], profileId: 5, status: "error", tooltip: "Connection stability: 58%", profiles: 2, lamps: 19 },
    { name: "Bergshamra", children: [], profileId: 1, status: "active", tooltip: "Connection stability: 94%", profiles: 3, lamps: 28 }
  ]
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
