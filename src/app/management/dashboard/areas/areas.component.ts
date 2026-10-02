import { Component } from '@angular/core';
import { AreaService } from '~local/services/area.service'

@Component({
  selector: 'areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent {
  areas$ = this.areaService.Areas

  // Indexed like areas$, one curve per card
  data$ = this.areaService.todayEnergy$

  unassignedLamps$ = this.areaService.unassignedLamps$

  constructor(private areaService: AreaService) { }

}
