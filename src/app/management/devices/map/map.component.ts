// TODO: Map shows only currently selected (in the list) groups/devices

import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { MarkerService } from '~local/services/marker.service';
import { ProfileService } from '~local/services/profile.service'
import { ShapeService } from '~local/services/shape.service';
import { Router } from '@angular/router';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import { Profile } from '~local/types'

type DeviceLayer = 'status' | 'sc' | 'profile'

@Component({
  selector: 'devices-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements AfterViewInit, OnInit {
  map;
  devices: any;
  markersGeoJsonData: any;
  accessToken = 'pk.eyJ1IjoiaWdvcnJhenZvZG92c2t5IiwiYSI6ImNrczV3dHI3ODA1YTQycnF5bnV4N2xjcm0ifQ.1b4VIA7aqOZc_oiiTyNl-w';
  deviceLayer = 'profile'
  getProfileColour: any
  profileNames: string[]

  // TODO: Replace with something
  iconSC = '<svg width="24" height="24" fill="inherit" xmlns="http://www.w3.org/2000/svg"><path d="M20 11h-4.25V6a.75.75 0 10-1.5 0v5H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2v-6a2 2 0 00-2-2zm.5 8a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5v-6a.5.5 0 01.5-.5h16a.501.501 0 01.5.5v6zM7 15a1 1 0 100 2.001A1 1 0 007 15zm5.702-6.702a3.249 3.249 0 010-4.596l-1.06-1.06a4.748 4.748 0 000 6.716l1.06-1.06zm5.656 1.06a4.748 4.748 0 000-6.717l-1.06 1.061a3.25 3.25 0 010 4.596l1.06 1.06z" fill="inherit"/></svg>'
  iconSensorTraffic = '<svg width="24" height="24" fill="inherit" xmlns="http://www.w3.org/2000/svg"><path d="M22 5l-7 4.9V7a2 2 0 00-2-2H3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2.9l7 4.9h1V5h-1zm-8.5 12a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5V7a.5.5 0 01.5-.5h10a.5.5 0 01.5.5v10zm8-.181l-6.5-4.55v-.538l6.5-4.55v9.638z" fill="inherit"/></svg>'
  iconOff = '<svg width="24" height="24" fill="inherit" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18.5a8.5 8.5 0 118.5-8.5 8.51 8.51 0 01-8.5 8.5zm1.942-11.433L12 11.01l-1.942-1.943-.99.99L11.01 12l-1.943 1.942.99.99L12 12.99l1.942 1.942.99-.99L12.99 12l1.942-1.942-.99-.99z" fill="inherit"/></svg>'
  iconAlert = '<svg width="24" height="24" fill="inherit" xmlns="http://www.w3.org/2000/svg"><path d="M11.41 13.5h1.18l.36-6.5h-1.9l.36 6.5zM12 2a10 10 0 100 20 10 10 0 000-20zm0 18.5a8.5 8.5 0 118.5-8.5 8.51 8.51 0 01-8.5 8.5zm0-5.307a.917.917 0 100 1.834.917.917 0 000-1.834z" fill="inherit"/></svg>'

  showNames: boolean = true

  private initMap(): void {
    this.map = L.map('map', {
      center: [55.8747, 26.5362],
      zoom: 13,
      zoomControl: false,
      zoomSnap: 0.5
    });
    const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/igorrazvodovsky/cks5ww8yk0kxm17p4t4lcftfr/tiles/{z}/{x}/{y}?access_token=' + this.accessToken, {
      maxZoom: 18,
      minZoom: 1,
    });
    tiles.addTo(this.map);
  }

  constructor(
    private markerService: MarkerService,
    private profileService: ProfileService,
    private shapeService: ShapeService,
    public router: Router
  ) { }

  // private highlightFeature(e) {
  //   const layer = e.target;
  //   layer.setStyle({
  //   });
  // }

  makeSCMarker(clusterMarkers, childCount) {
    const sc = clusterMarkers.filter(e => e.feature.properties.type == 'sc').map(e => e.feature.properties.name).join(', ')
    return L.divIcon({
      className: 'dark marker--cluster',
      html: sc.length > 0
        ? `<div>${childCount} •&nbsp;<span class="text-secondary">SC&nbsp;</span> ${sc}</div>`
        : `<div>${childCount} • Uninitialised`
    });
  }

  makeProfileMarker(clusterMarkers, childCount) {
    const clusterProfilesColours = this.getClusterProfileIds(clusterMarkers).map(id => this.getProfileColour(id))
    const profileDots = clusterProfilesColours.map(c => `<i class="dot" style="background: ${c}"></i> `).join('')
    return L.divIcon({
      className: 'marker--cluster ' + status, html: `<div>${childCount} ${profileDots}</div>`
    });
  }

  makeStatusMarker(clusterMarkers, childCount) {
    let status = "active"
    let icon = ""
    const warning = clusterMarkers.filter(e => e.feature.properties.status === 'warning').length > 0
    const danger = clusterMarkers.filter(e => e.feature.properties.status === 'danger').length > 0
    const offline = clusterMarkers.filter(e => e.feature.properties.status === 'off').length == clusterMarkers.length

    if (warning || danger) icon = this.iconAlert
    if (warning) status = "warning"
    if (danger) status = "danger"
    if (offline) {
      status = "off"
      icon = this.iconOff
    }
    return L.divIcon({
      className: 'dark marker--cluster ' + status, html: `<div>${icon} ${childCount}</div>`
    });
  }

  initGroupsLayer() {
    let markers = L.markerClusterGroup({
      iconCreateFunction: (cluster) => {
        const clusterMarkers = cluster.getAllChildMarkers()
        if (this.deviceLayer == "status") return this.makeStatusMarker(clusterMarkers, cluster.getChildCount())
        if (this.deviceLayer == "sc") return this.makeSCMarker(clusterMarkers, cluster.getChildCount())
        if (this.deviceLayer == "profile") return this.makeProfileMarker(clusterMarkers, cluster.getChildCount())
      }
    });

    let geoJsonLayer = L.geoJson(this.markersGeoJsonData, {
      onEachFeature: (feature, layer) => {
        // layer.bindPopup(feature.properties.id);
        // TODO: Popover: two lamps in one spot?
        // TODO: Tooltip: quick status summary: on / off, active / inactive, errors, responding + date
        // layer.bindTooltip("Test", { permanent: true }).openTooltip();

        let pointer = ''
        let icon = ''
        let label = this.showNames ? feature.properties.name : ''
        if (feature.properties.type == "sc") icon = this.iconSC
        if (feature.properties.type == "traffic") icon = this.iconSensorTraffic

        if (feature.properties.type == "lamp" && feature.properties.orientation !== 0) pointer = `<div class="pointer" style="transform: rotate(${feature.properties.orientation}deg)"></div>`


        layer.setIcon(L.divIcon({
          className: `marker--${feature.properties.type} ${feature.properties.status}`,
          html: pointer + `<figure>${icon}</figure><label>${label}</label>`
        }))

        layer.on('click', () => this.router.navigate(['/management/devices/device/' + feature.properties.id]));
      }
    });

    markers.addLayer(geoJsonLayer)
    this.map.addLayer(markers)
    // TODO: Zoom on specific area/device if selected
    // const latLngs = [ marker.getLatLng() ]
    // const markerBounds = L.latLngBounds(latLngs)
    // this.map.fitBounds(markerBounds)
    // https://leafletjs.com/reference-1.7.1.html#map-flyto
    this.map.fitBounds(markers.getBounds(), {padding: [50, 50]})
  }

  ngOnInit(): void {
    this.markerService.getMarkers().subscribe((markers: any) => {
      this.markersGeoJsonData = markers;
      this.initGroupsLayer()
    });
    this.profileService.Profiles.subscribe(profiles => {
      this.getProfileColour = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10).domain(profiles.map((p:any) => p.id))
    });
  }

  getClusterProfileIds(clusterMarkers): number[] {
    const ids = clusterMarkers
      .filter(e => e.feature.properties.hasOwnProperty('profile'))
      .map(e => e.feature.properties.profile.id).filter(i => i)
    const uniqueIds = [...new Set<number>(ids)]
    return Array.from(uniqueIds)
  }

  ngAfterViewInit(): void {
    this.initMap()
  }

}
