import { Injectable } from '@angular/core';
import { Device } from '../types';
import { DEVICES } from '../../assets/data/devices';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor(private messageService: MessageService) { }

  getDevices(): Observable<Device[]> {
    const devices = of(DEVICES);
    this.messageService.add('DeviceService: fetched devices');
    return devices;
  }
}
