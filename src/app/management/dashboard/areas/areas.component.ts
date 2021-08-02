import { Component, OnInit } from '@angular/core';
import { AREA } from '~local/../assets/data/areas';

@Component({
  selector: 'areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {
  data = AREA
  areas = [
    {
      name: "Ventas",
      children: [],
      profileId: 1
    },
    {
      name: "Tabore",
      children: [],
      profileId: 2
    },
    {
      name: "Laucese",
      children: [],
      profileId: 3
    },
    {
      name: "Otrie Peski",
      children: [],
      profileId: 3
    },
    {
      name: "Čerepova",
      children: [],
      profileId: 1
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
