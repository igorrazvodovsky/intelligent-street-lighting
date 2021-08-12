// TODO: Map shows only currently selected (in the list) groups/devices

import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '~local/services/marker.service';
import { ShapeService } from '~local/services/shape.service';

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

  accessToken = 'pk.eyJ1IjoiaWdvcnJhenZvZG92c2t5IiwiYSI6ImNrczV3dHI3ODA1YTQycnF5bnV4N2xjcm0ifQ.1b4VIA7aqOZc_oiiTyNl-w';

  private initMap(): void {
    this.map = L.map('map', {
      center: [55.8747, 26.5362],
      zoom: 12,
      zoomControl: false
    });

    new L.Control.Zoom({ position: 'bottomright' }).addTo(this.map);

    const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=' + this.accessToken, {
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

  private highlightFeature(e) {
    const layer = e.target;

    layer.setStyle({
      opacity: 1.0,
      color: '#DFA612',
      fill: true
    });
  }

  private resetFeature(e) {
    const layer = e.target;

    layer.setStyle({
      opacity: 0.5,
      color: '#008f68'
    });
  }

  private initAreasLayer() {
    const areaLayer = L.geoJSON(this.areas, {
      style: (feature) => ({
        opacity: 0.5,
        color: '#008f68',
        fill: true
      }),
      onEachFeature: (feature, layer) => (
        layer.on({
          mouseover: (e) => (this.highlightFeature(e)),
          mouseout: (e) => (this.resetFeature(e)),
        })
      )
    });

    this.map.addLayer(areaLayer);
    areaLayer.bringToBack();
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
