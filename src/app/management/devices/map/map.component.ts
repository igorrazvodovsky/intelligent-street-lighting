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

  // TODO:
  iconSC = '<svg width="24" height="24" fill="inherit" xmlns="http://www.w3.org/2000/svg"><path d="M20 11h-4.25V6a.75.75 0 10-1.5 0v5H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2v-6a2 2 0 00-2-2zm.5 8a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5v-6a.5.5 0 01.5-.5h16a.501.501 0 01.5.5v6zM7 15a1 1 0 100 2.001A1 1 0 007 15zm5.702-6.702a3.249 3.249 0 010-4.596l-1.06-1.06a4.748 4.748 0 000 6.716l1.06-1.06zm5.656 1.06a4.748 4.748 0 000-6.717l-1.06 1.061a3.25 3.25 0 010 4.596l1.06 1.06z" fill="inherit"/></svg>'


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
        // TODO: (other) statuses
        let status = "active"
        const warning = cluster.getAllChildMarkers().filter(e => e.feature.properties.status === 'warning').length > 0
        const danger = cluster.getAllChildMarkers().filter(e => e.feature.properties.status === 'danger').length > 0
        if (warning) status = "warning"
        if (danger) status = "danger"
        return L.divIcon({
          className: 'marker--cluster', html: `<div><span class="dot ${status}"></span>${cluster.getChildCount()}</div>`
        });
      }
    });

    let geoJsonLayer = L.geoJson(this.markersGeoJsonData, {
      onEachFeature: (feature, layer) => {
        // layer.bindPopup(feature.properties.id);
        // Popover: two lamps in one spot?
        // Tooltip: quick status summary: on / off, active / inactive, errors, responding + date
        // layer.bindTooltip("Test", { permanent: true }).openTooltip();

        // IF SC, IF Lamp, IF Traffic, etc.

        let pointer = ''
        let icon = ''
        if (feature.properties.type == "sc") icon = this.iconSC

        if (feature.properties.type == "lamp" && feature.properties.orientation !== 0) pointer = `<div class="pointer" style="transform: rotate(${feature.properties.orientation}deg)"></div>`


        layer.setIcon(L.divIcon({
          className: 'marker--' + feature.properties.type,
          html: pointer + `<figure>${icon}</figure><label>${feature.properties.id}</label>`
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
