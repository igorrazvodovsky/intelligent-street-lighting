// TODO: Map shows only currently selected (in the list) groups/devices

import { Component, AfterViewInit, OnInit } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet.markercluster';
import { MarkerService } from '~local/services/marker.service';
import { ShapeService } from '~local/services/shape.service';
import { Router } from '@angular/router';

@Component({
  selector: 'devices-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements AfterViewInit, OnInit {
  private map;
  devices: any;
  markersGeoJsonData: any;
  accessToken = 'pk.eyJ1IjoiaWdvcnJhenZvZG92c2t5IiwiYSI6ImNrczV3dHI3ODA1YTQycnF5bnV4N2xjcm0ifQ.1b4VIA7aqOZc_oiiTyNl-w';

  private initMap(): void {
    this.map = L.map('map', {
      center: [55.8747, 26.5362],
      zoom: 13,
      zoomControl: false
    });

    new L.Control.Zoom({ position: 'bottomright' }).addTo(this.map);
    const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/igorrazvodovsky/cks5ww8yk0kxm17p4t4lcftfr/tiles/{z}/{x}/{y}?access_token=' + this.accessToken, {
      maxZoom: 18,
      minZoom: 3,
    });

    tiles.addTo(this.map);
  }

  constructor(
    private markerService: MarkerService,
    private shapeService: ShapeService,
    public router: Router
  ) { }

  // private highlightFeature(e) {
  //   const layer = e.target;
  //   layer.setStyle({
  //   });
  // }

  initGroupsLayer() {

    let markers = L.markerClusterGroup({
      iconCreateFunction: function (cluster) {
        return L.divIcon({ className: 'marker--cluster', html: '<div>' + cluster.getChildCount() + '</div>' });
      }
    });

    let geoJsonLayer = L.geoJson(this.markersGeoJsonData, {
      onEachFeature: (feature, layer) => {
        // layer.bindPopup(feature.properties.id);
        // Popover: two lamps in one spot?
        // Tooltip: quick status summary: on / off, active / inactive, errors, responding + date
        // layer.bindTooltip("Test", { permanent: true }).openTooltip();

        // IF SC, IF Lamp, IF Traffic, etc.
        layer.setIcon(L.divIcon({
          className: 'marker--device', html: '<div>' + feature.properties.id + '</div>'
        }))

        layer.on('click', () => this.router.navigate(['/management/devices/' + feature.properties.id]));
      }
    });

    markers.addLayer(geoJsonLayer);
    this.map.addLayer(markers);
    this.map.fitBounds(markers.getBounds());
  }

  ngOnInit(): void {
    this.markerService.getMarkers().subscribe(markers => {
      this.markersGeoJsonData = markers;
      this.initGroupsLayer();
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

}
