import { Component, OnInit, Input } from '@angular/core';
import { DeviceEvent, Device, DeviceGroup } from '~local/types'
import { DeviceService } from '~local/services/device.service';

@Component({
  selector: 'device-event',
  templateUrl: './device-event.component.html',
  styleUrls: ['./device-event.component.scss']
})
export class DeviceEventComponent implements OnInit {
  @Input() event: DeviceEvent;
  device: Device;
  group: DeviceGroup;
  now = new Date();

  constructor(private service: DeviceService) { }

  ngOnInit(): void {
    this.service.getDevice(this.event.deviceId)
      .subscribe(device => {
        this.device = device;
        this.getGroup(device.groupId).subscribe(group => {
          this.group = group
        })
      });
  }

  getGroup(id) {
    return this.service.getGroup(id);
  }

}
