import { Injectable } from '@angular/core';
import { Device, DeviceGroup } from '../types';
import { DEVICES, GROUPS } from '~local/../assets/data/devices';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor(private messageService: MessageService) { }

  getGroups(): Observable<DeviceGroup[]> {
    const groups = of(GROUPS);
    this.messageService.add('DeviceService: fetched groups');
    return groups;
  }

  getGroup(id: number | string) {
    return this.getGroups().pipe(
      // TODO: (+) before `id` turns the string into a number
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
    const devices = of(DEVICES);
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
