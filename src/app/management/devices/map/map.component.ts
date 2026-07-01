// TODO: Map shows only currently selected (in the list) groups/devices

import { Component, AfterViewInit, OnInit, OnDestroy, Input, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { MarkerService } from '~local/services/marker.service';
import { ProfileService } from '~local/services/profile.service'
import { ShapeService } from '~local/services/shape.service';
import { DeviceService } from '~local/services/device.service';
import { Router } from '@angular/router';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import { Profile, DeviceStatus } from '~local/types'
import { iconAlert, iconOff, iconSensorEnv, iconSensorTraffic, iconSC } from './icons'

// leaflet.markercluster centers a cluster icon on the average lat/lng of its
// children. Along a curving street (e.g. one hugging a shoreline) that average
// can land off the road entirely, even though every individual marker sits on
// it. Anchoring on the first-added child (_cLatLng) isn't reliable either,
// since clustering order doesn't correlate with geographic centrality. Instead
// snap the icon to whichever real member marker is closest to the computed
// centroid, so it's always a point that's actually on the map's road network.
const originalRecalculateBounds = (L as any).MarkerCluster.prototype._recalculateBounds;
(L as any).MarkerCluster.prototype._recalculateBounds = function (): void {
  originalRecalculateBounds.call(this);
  const centroid = this._latlng;
  const members = this.getAllChildMarkers();
  let closest = members[0];
  let closestDistSq = Infinity;
  for (const marker of members) {
    const ll = marker.getLatLng();
    const dLat = ll.lat - centroid.lat;
    const dLng = ll.lng - centroid.lng;
    const distSq = dLat * dLat + dLng * dLng;
    if (distSq < closestDistSq) {
      closestDistSq = distSq;
      closest = marker;
    }
  }
  this._latlng = closest.getLatLng();
};

type DeviceLayer = 'status' | 'sc' | 'profile'

@Component({
  selector: 'devices-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements AfterViewInit, OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  selectedDevice: number = 15;
  map;
  devices: any;
  markersGeoJsonData: any;
  markers: any;
  accessToken = 'pk.eyJ1IjoiaWdvcnJhenZvZG92c2t5IiwiYSI6ImNrczV3dHI3ODA1YTQycnF5bnV4N2xjcm0ifQ.1b4VIA7aqOZc_oiiTyNl-w';
  deviceLayer = 'status'
  profileNames: string[]
  showNames: boolean = true

  private initMap(): void {
    const city = this.deviceService.city;
    // Leaflet fires a flood of mousemove/drag/zoom events. Creating and running
    // the map outside Angular's zone keeps those events from triggering app-wide
    // change detection on every frame. Handlers that need Angular (e.g. routing)
    // must re-enter the zone explicitly.
    this.ngZone.runOutsideAngular(() => {
      this.map = L.map('map', {
        center: [city.centerLat, city.centerLng],
        zoom: 13,
        zoomControl: false,
        zoomSnap: 0.5
      });
      const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/igorrazvodovsky/cks5ww8yk0kxm17p4t4lcftfr/tiles/{z}/{x}/{y}?access_token=' + this.accessToken, {
        maxZoom: 18,
        minZoom: 1,
      });
      tiles.addTo(this.map);
    });
  }

  constructor(
    private markerService: MarkerService,
    private profileService: ProfileService,
    private shapeService: ShapeService,
    private deviceService: DeviceService,
    private ngZone: NgZone,
    public router: Router
  ) { }

  // private highlightFeature(e) {
  //   const layer = e.target;
  //   layer.setStyle({
  //   });
  // }

  changeLayer(layer) {
    this.deviceLayer = layer;
    this.markers.clearLayers()
    this.initGroupsLayer();
  }

  makeSCMarker(clusterMarkers, childCount) {
    const sc = clusterMarkers.filter(e => e.feature.properties.type == 'sc').map(e => e.feature.properties.name).join(', ')
    return L.divIcon({
      className: 'dark marker--cluster',
      // L.DivIcon defaults iconSize to [12, 12], anchoring the icon 6px up/left
      // of its true coordinate. These labels are variably sized (width: auto),
      // so let the CSS transform on the inner div do all the centering instead.
      iconSize: [0, 0],
      html: sc.length > 0
        ? `<div>${childCount} •&nbsp;<span class="text-secondary">SC&nbsp;</span> ${sc}</div>`
        : `<div>${childCount} • Uninitialised`
    });
  }

  makeProfileMarker(clusterMarkers, childCount) {
    const clusterProfilesColours = this.getClusterProfileIds(clusterMarkers).map(id => this.profileService.getProfileColour(id.toString()))
    const profileDots = clusterProfilesColours.map(colour => `<i class="dot" style="background: ${colour}"></i> `).join('')
    return L.divIcon({
      className: 'marker--cluster ' + status,
      iconSize: [0, 0],
      html: `<div>${childCount} ${profileDots}</div>`
    });
  }

  makeStatusMarker(clusterMarkers, childCount) {
    let status = "active"
    let icon = ""
    // TODO:
    let warningStatuses = ['not responding', 'no power', 'unassigned']
    const warning = clusterMarkers.filter(e => warningStatuses.includes(e.feature.properties.status)).length > 0
    const danger = clusterMarkers.filter(e => e.feature.properties.status === 'alarm').length > 0
    const offline = clusterMarkers.filter(e => e.feature.properties.status === 'off').length == clusterMarkers.length

    if (warning || danger) icon = iconAlert
    if (warning) status = "warning"
    if (danger) status = "danger"
    if (offline) {
      status = "off"
      icon = iconOff
    }
    return L.divIcon({
      className: 'dark marker--cluster ' + status,
      iconSize: [0, 0],
      html: `<div>${icon} ${childCount}</div>`
    });
  }

  initGroupsLayer() {
    this.markers = L.markerClusterGroup({
      iconCreateFunction: (cluster) => {
        const clusterMarkers = cluster.getAllChildMarkers()
        if (this.deviceLayer == "status") return this.makeStatusMarker(clusterMarkers, cluster.getChildCount())
        if (this.deviceLayer == "sc") return this.makeSCMarker(clusterMarkers, cluster.getChildCount())
        if (this.deviceLayer == "profile") return this.makeProfileMarker(clusterMarkers, cluster.getChildCount())
      },
      // Leaflet's default coverage polygon is solid blue; className hands
      // styling over to map.scss to match the dark cluster badges instead.
      polygonOptions: { className: 'cluster-coverage' }
    });

    let geoJsonLayer = L.geoJson(this.markersGeoJsonData, {
      onEachFeature: (feature, layer) => {
        // layer.bindPopup(feature.properties.id);
        // TODO: Popover: two lamps in one spot?
        // TODO: Tooltip: quick status summary: on / off, active / inactive, errors, responding + date
        // layer.bindTooltip("Test", { permanent: true }).openTooltip();

        let pointer = ''
        let icon = ''
        let label = this.showNames && feature.properties.type !== "sensor" ? feature.properties.name : ''
        if (feature.properties.type == "sc") icon = iconSC
        if (feature.properties.type == "sensor") {
          if (feature.properties.sensor.type == "env") icon = iconSensorEnv
          if (feature.properties.sensor.type == "traffic") icon = iconSensorTraffic
        }

        if (feature.properties.type == "lamp" && feature.properties.orientation !== 0) pointer = `<div class="pointer" style="transform: rotate(${feature.properties.orientation}deg)"></div>`


        layer.setIcon(L.divIcon({
          className: `marker--${feature.properties.type} ${feature.properties.status} ${feature.properties.id == this.selectedDevice ? 'selected' : ''}`,
          html: pointer + `<figure>${icon}</figure><label>${label}</label>`
        }))

        // Re-enter the Angular zone so routing triggers change detection.
        layer.on('click', () => this.ngZone.run(() => this.router.navigate(['/management/devices/device/' + feature.properties.id])));
      }
    });

    this.markers.addLayer(geoJsonLayer)
    this.map.addLayer(this.markers)
    // TODO: Zoom on specific area/device if selected
    // const latLngs = [ marker.getLatLng() ]
    // const markerBounds = L.latLngBounds(latLngs)
    // this.map.fitBounds(markerBounds)
    // https://leafletjs.com/reference-1.7.1.html#map-flyto
    this.map.fitBounds(this.markers.getBounds(), { padding: [50, 50] })
  }

  ngOnInit(): void {
    this.deviceService.activeCity$.pipe(takeUntil(this.destroy$)).subscribe(city => {
      if (this.map) {
        this.map.setView([city.centerLat, city.centerLng], 13);
      }
    });

    this.markerService.getMarkers().pipe(takeUntil(this.destroy$)).subscribe((markers: any) => {
      this.ngZone.runOutsideAngular(() => {
        if (this.markers) {
          this.map.removeLayer(this.markers);
        }
        this.markersGeoJsonData = markers;
        this.initGroupsLayer()
      });
    })
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.map) {
      this.map.remove();
    }
  }

}
