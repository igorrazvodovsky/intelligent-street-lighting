import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../../../services/marker.service';
import { ShapeService } from '../../../services/shape.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
@Component({
  selector: 'devices-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map;
  private areas;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 55.8747, 26.5362 ],
      zoom: 12,
      zoomControl: false
    });

    new L.Control.Zoom({ position: 'bottomright' }).addTo(this.map);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor(
    private markerService: MarkerService,
    private shapeService: ShapeService
  ) { }

  private initAreasLayer() {
    const stateLayer = L.geoJSON(this.areas, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.3,
        color: '#008f68',
        fillOpacity: 0.6,
        fillColor: '#6DB65B'
      })
    });

    this.map.addLayer(stateLayer);
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeCapitalMarkers(this.map);
    // TODO: preload the data in a resolver
    this.shapeService.getStateShapes().subscribe(areas => {
      this.areas = areas;
      this.initAreasLayer();
    });
  }

}
