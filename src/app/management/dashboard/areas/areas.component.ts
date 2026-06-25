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
    { name: "Ventas", children: [], profileId: 1, status: "active", tooltip: "Connection stability: 99%" },
    { name: "Tabore", children: [], profileId: 2, status: "active", tooltip: "Connection stability: 98%" },
    { name: "Laucese", children: [], profileId: 3, status: "warning", tooltip: "Connection stability: 82%" },
    { name: "Otrie Peski", children: [], profileId: 3, status: "active", tooltip: "Connection stability: 96%" },
    { name: "Čerepova", children: [], profileId: 1, status: "error", tooltip: "Connection stability: 45%" }
  ],
  'solna': [
    { name: "Skytteholm", children: [], profileId: 1, status: "active", tooltip: "Connection stability: 97%" },
    { name: "Arenastaden", children: [], profileId: 2, status: "active", tooltip: "Connection stability: 99%" },
    { name: "Råsunda", children: [], profileId: 3, status: "active", tooltip: "Connection stability: 95%" },
    { name: "Hagalund", children: [], profileId: 3, status: "warning", tooltip: "Connection stability: 85%" },
    { name: "Huvudsta", children: [], profileId: 3, status: "active", tooltip: "Connection stability: 92%" },
    { name: "Karolinska", children: [], profileId: 4, status: "active", tooltip: "Connection stability: 98%" },
    { name: "Järva", children: [], profileId: 5, status: "error", tooltip: "Connection stability: 58%" },
    { name: "Bergshamra", children: [], profileId: 1, status: "active", tooltip: "Connection stability: 94%" }
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
