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
      profileId: 1,
      status: "active",
      tooltip: "Connection stability: 99%"
    },
    {
      name: "Tabore",
      children: [],
      profileId: 2,
      status: "active",
      tooltip: "Connection stability: 98%"
    },
    {
      name: "Laucese",
      children: [],
      profileId: 3,
      status: "warning",
      tooltip: "Connection stability: 82%"
    },
    {
      name: "Otrie Peski",
      children: [],
      profileId: 3,
      status: "active",
      tooltip: "Connection stability: 96%"
    },
    {
      name: "Čerepova",
      children: [],
      profileId: 1,
      status: "error",
      tooltip: "Connection stability: 45%"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
