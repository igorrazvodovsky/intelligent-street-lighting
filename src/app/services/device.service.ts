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

  private _devices = this.http
    .get(this.devicesUrl)
    .pipe(
      map((data: any) => data.features.map(e => e.properties))
    )

  private _groups = of(GROUPS)

  public get Devices(): Observable<Device[]> {
    return this._devices
  }

  public get Groups(): Observable<DeviceGroup[]> {
    return this._groups
  }

  constructor(private messageService: MessageService, private http: HttpClient,) { }

  // getGroups(): Observable<DeviceGroup[]> {
  //   const groups = of(GROUPS);
  //   this.messageService.add('DeviceService: fetched groups')
  //   return groups;
  // }

  getGroup(id: number | string) {
    return this._groups.pipe(
      map((groups: DeviceGroup[]) => groups.find(group => group.id === +id)!)
    );
  }

  getGroupsByProfile(id: number | string) {
    return this._groups.pipe(
      map((groups: DeviceGroup[]) => groups.filter(group => group.profileId === +id)!)
    );
  }

  getGroupsByParent(id: number | string) {
    return this._groups.pipe(
      map((groups: DeviceGroup[]) => groups.filter(group => group.parentId == id)!)
    );
  }

  // getDevices(): Observable<Device[]> {
  //   this.messageService.add('DeviceService: fetched devices')
  //   return this.devices
  // }

  getDevice(id: number | string) {
    this.messageService.add('DeviceService: fetched device ' + id)
    return this._devices.pipe(
      map((devices: Device[]) => devices.find(device => device.id === +id)!)
    );
  }

  getDevicesByGroup(id: number | string) {
    return this._devices.pipe(
      map((devices: Device[]) => devices.filter(device => device.groupId === +id)!)
    );
  }

}
