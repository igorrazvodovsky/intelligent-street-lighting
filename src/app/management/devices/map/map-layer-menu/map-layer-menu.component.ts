import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'map-layer-menu',
  templateUrl: './map-layer-menu.component.html',
  styleUrls: ['./map-layer-menu.component.scss']
})
export class MapLayerMenuComponent implements OnInit {
  showNames: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

}
