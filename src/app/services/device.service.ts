import { Injectable } from '@angular/core';
import { Device, DeviceGroup } from '../types';
import { GROUPS } from '~local/../assets/data/devices';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  city = {
    name: "Daugavpils"
  };
  devicesUrl: string = '/assets/data/devices.geojson'

  constructor(private messageService: MessageService, private http: HttpClient,) { }

  getGroups(): Observable<DeviceGroup[]> {
    const groups = of(GROUPS);
    this.messageService.add('DeviceService: fetched groups');
    return groups;
  }

  getGroup(id: number | string) {
    return this.getGroups().pipe(
      map((groups: DeviceGroup[]) => groups.find(group => group.id === +id)!)
    );
  }

  getGroupsByProfile(id: number | string) {
    return this.getGroups().pipe(
      map((groups: DeviceGroup[]) => groups.filter(group => group.profileId === +id)!)
    );
  }

  getGroupsByParent(id: number | string) {
    return this.getGroups().pipe(
      map((groups: DeviceGroup[]) => groups.filter(group => group.parentId == id)!)
    );
  }

  getDevices(): Observable<Device[]> {
    const devices = this.http
      .get(this.devicesUrl)
      .pipe(
        map((data: any) => data.features.map(e => e.properties))
      )
    this.messageService.add('DeviceService: fetched devices');
    return devices;
  }

  getDevice(id: number | string) {
    return this.getDevices().pipe(
      // (+) before `id` turns the string into a number
      map((devices: Device[]) => devices.find(device => device.id === +id)!)
    );
  }

  getDevicesByGroup(id: number | string) {
    return this.getDevices().pipe(
      map((devices: Device[]) => devices.filter(device => device.groupId === +id)!)
    );
  }

}
