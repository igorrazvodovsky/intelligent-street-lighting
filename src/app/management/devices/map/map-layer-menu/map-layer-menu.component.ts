import { Component, OnInit } from '@angular/core';
import { Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'map-layer-menu',
  templateUrl: './map-layer-menu.component.html',
  styleUrls: ['./map-layer-menu.component.scss']
})
export class MapLayerMenuComponent implements OnInit {
  showNames: boolean = true
  @Output() layerChange = new EventEmitter<string>();
  @Input() currentLayer: 'sc' | 'profile' | 'status'

  changeLayer(value: string) {
    this.layerChange.emit(value);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
