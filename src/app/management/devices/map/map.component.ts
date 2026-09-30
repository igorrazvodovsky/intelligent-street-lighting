// TODO: Map shows only currently selected (in the list) groups/devices

import { Component, AfterViewInit, OnInit, OnDestroy, Input, NgZone, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { MarkerService } from '~local/services/marker.service';
import { ProfileService } from '~local/services/profile.service'
import { ShapeService } from '~local/services/shape.service';
import { CityService } from '~local/services/city.service';
import { NavigationEnd, Router } from '@angular/router';
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
  // The original returns early for an empty cluster (e.g. after its last marker is removed)
  if (!members.length) return;
  // A degree of longitude shrinks with latitude (~0.5 of a latitude degree at 60°N)
  const lngScale = Math.cos(centroid.lat * Math.PI / 180);
  let closest = members[0];
  let closestDistSq = Infinity;
  for (const marker of members) {
    const ll = marker.getLatLng();
    const dLat = ll.lat - centroid.lat;
    const dLng = (ll.lng - centroid.lng) * lngScale;
    const distSq = dLat * dLat + dLng * dLng;
    if (distSq < closestDistSq) {
      closestDistSq = distSq;
      closest = marker;
    }
  }
  this._latlng = closest.getLatLng();
};

type DeviceLayer = 'status' | 'sc' | 'profile'

// Street lights sit ~30 m apart, so from this zoom on every device is drawn on
// its own. markercluster works on integer zooms, so with zoomSnap 0.5 this
// already applies at 16.5.
const UNCLUSTERED_ZOOM = 17

const WARNING_STATUSES = ['not responding', 'no power', 'unassigned', 'warning']
const DANGER_STATUSES = ['alarm', 'error']

// One severity scale shared by device markers and the cluster badges that
// summarise them, so a cluster flagged red opens up to a marker that's red too
function severity(status: string): 'danger' | 'warning' | 'off' | '' {
  if (DANGER_STATUSES.includes(status)) return 'danger'
  if (WARNING_STATUSES.includes(status)) return 'warning'
  if (status === 'off') return 'off'
  return ''
}

@Component({
  selector: 'devices-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements AfterViewInit, OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  selectedDevice: number = null;
  // Set by "Show on map" (?show=map); consumed once the marker exists
  private focusPending = false;
  private deviceLayers = new Map<number, any>();
  map;
  devices: any;
  markersGeoJsonData: any;
  markers: any;
  accessToken = 'pk.eyJ1IjoiaWdvcnJhenZvZG92c2t5IiwiYSI6ImNrczV3dHI3ODA1YTQycnF5bnV4N2xjcm0ifQ.1b4VIA7aqOZc_oiiTyNl-w';
  deviceLayer = 'status'
  profileNames: string[]
  showNames: boolean = true

  private initMap(): void {
    const city = this.cityService.city;
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
    private cityService: CityService,
    private ngZone: NgZone,
    private host: ElementRef<HTMLElement>,
    public router: Router
  ) { }

  // private highlightFeature(e) {
  //   const layer = e.target;
  //   layer.setStyle({
  //   });
  // }

  // Only the cluster badges depend on the layer, so redraw those in place
  // rather than rebuilding the markers and losing the current view
  changeLayer(layer) {
    this.deviceLayer = layer;
    this.ngZone.runOutsideAngular(() => this.markers.refreshClusters())
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
      className: 'marker--cluster',
      iconSize: [0, 0],
      html: `<div>${childCount} ${profileDots}</div>`
    });
  }

  makeStatusMarker(clusterMarkers, childCount) {
    const severities = clusterMarkers.map(e => severity(e.feature.properties.status))
    let status = 'active'
    let icon = ''
    if (severities.includes('warning')) status = 'warning'
    if (severities.includes('danger')) status = 'danger'
    if (status !== 'active') icon = iconAlert
    if (severities.every(s => s === 'off')) {
      status = 'off'
      icon = iconOff
    }
    return L.divIcon({
      className: 'dark marker--cluster ' + status,
      iconSize: [0, 0],
      html: `<div>${icon} ${childCount}</div>`
    });
  }

  makeDeviceIcon(layer) {
    const p = layer.feature.properties
    // Lamps are a 24px dot, SCs and sensors a 40px badge; iconSize lets Leaflet
    // centre the icon on the device's coordinate
    const size = p.type === 'lamp' ? 24 : 40
    return L.divIcon({
      className: `marker--${p.type} ${p.status} ${severity(p.status)} ${p.id == this.selectedDevice ? 'selected' : ''}`,
      iconSize: [size, size],
      html: layer.iconHtml
    })
  }

  // Highlights the device open in the side panel and, when asked, zooms the
  // map (expanding its cluster if needed) until the marker is visible
  selectDevice(id: number, focus: boolean) {
    const previous = this.deviceLayers.get(this.selectedDevice)
    this.selectedDevice = id
    if (previous) {
      previous.setIcon(this.makeDeviceIcon(previous))
      previous.setZIndexOffset(0)
    }
    const layer = this.deviceLayers.get(id)
    if (layer) {
      layer.setIcon(this.makeDeviceIcon(layer))
      layer.setZIndexOffset(1000)
    }
    this.focusPending = focus
    this.focusSelectedDevice()
  }

  private focusSelectedDevice() {
    const layer = this.deviceLayers.get(this.selectedDevice)
    if (!this.focusPending || !layer || !this.map) return
    this.focusPending = false
    // zoomToShowLayer treats a marker under the device list as already visible,
    // so always re-centre it in the uncovered part of the map afterwards
    this.markers.zoomToShowLayer(layer, () => {
      const zoom = Math.max(this.map.getZoom(), UNCLUSTERED_ZOOM)
      const inset = this.coveredLeft()
      const center = this.map.unproject(this.map.project(layer.getLatLng(), zoom).subtract([inset / 2, 0]), zoom)
      this.map.setView(center, zoom)
    })
  }

  // Width of the map hidden under the device list, which slides over the map
  // rather than beside it. Ignored when the list covers (nearly) all of it, as
  // on handsets or when maximized.
  private coveredLeft(): number {
    const panel = this.host.nativeElement.closest('mat-sidenav-container')?.querySelector('.mat-drawer-opened')
    if (!panel) return 0
    const mapRect = this.map.getContainer().getBoundingClientRect()
    const covered = panel.getBoundingClientRect().right - mapRect.left
    return covered > 0 && covered < mapRect.width * 0.7 ? covered : 0
  }

  private fitToDevices() {
    const bounds = this.markers.getBounds()
    if (!bounds.isValid()) return
    this.map.fitBounds(bounds, { paddingTopLeft: [this.coveredLeft() + 50, 50], paddingBottomRight: [50, 50] })
  }

  initGroupsLayer() {
    this.deviceLayers.clear()
    this.markers = L.markerClusterGroup({
      iconCreateFunction: (cluster) => {
        const clusterMarkers = cluster.getAllChildMarkers()
        if (this.deviceLayer == "status") return this.makeStatusMarker(clusterMarkers, cluster.getChildCount())
        if (this.deviceLayer == "sc") return this.makeSCMarker(clusterMarkers, cluster.getChildCount())
        if (this.deviceLayer == "profile") return this.makeProfileMarker(clusterMarkers, cluster.getChildCount())
      },
      // Leaflet's default coverage polygon is solid blue; className hands
      // styling over to map.scss to match the dark cluster badges instead.
      polygonOptions: { className: 'cluster-coverage' },
      disableClusteringAtZoom: UNCLUSTERED_ZOOM,
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


        const html = pointer + `<figure>${icon}</figure><label>${label}</label>`
        layer.iconHtml = html
        layer.setIcon(this.makeDeviceIcon(layer))
        if (feature.properties.id == this.selectedDevice) layer.setZIndexOffset(1000)
        this.deviceLayers.set(feature.properties.id, layer)

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
    if (this.focusPending && this.deviceLayers.has(this.selectedDevice)) {
      this.focusSelectedDevice()
    } else {
      this.fitToDevices()
    }
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      startWith(null),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const match = this.router.url.match(/\/devices\/device\/(\d+)/)
      const focus = this.router.parseUrl(this.router.url).queryParams.show === 'map'
      this.ngZone.runOutsideAngular(() => this.selectDevice(match ? +match[1] : null, focus))
    });

    // Switching city needs no view change of its own: the new city's markers
    // arrive through getMarkers() and the map fits itself to them
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
