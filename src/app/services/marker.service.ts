import { Injectable } from '@angular/core';
import { DeviceService } from './device.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  constructor(private deviceService: DeviceService) { }

  // The active city's devices as GeoJSON, from the same request as DeviceService.Devices
  getMarkers() {
    return this.deviceService.DevicesGeoJson;
  }
}
