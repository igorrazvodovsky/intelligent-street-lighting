import { Component, OnInit, Input } from '@angular/core';
import { DeviceService } from '~local/services/device.service'
import { Observable } from 'rxjs';
import { Device, DeviceGroup, Profile } from '~local/types'

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() groupId: number;
  @Input() deviceId: number;

  deviceSiblings$: Observable<Device[]>;
  devices: { name: string, id: number }[];
  currentDevice: { name: string, id: number };

  constructor(
    private service: DeviceService
  ) { }

  ngOnInit(): void {
    this.deviceSiblings$ = this.service.getDevicesByGroup(this.groupId);

    this.deviceSiblings$.subscribe(devices => {
      this.devices = devices.map(device => ({ name: device.name, id: device.id }));
      this.currentDevice = this.devices.find(device => device.id == this.deviceId)
    });
  }



}
