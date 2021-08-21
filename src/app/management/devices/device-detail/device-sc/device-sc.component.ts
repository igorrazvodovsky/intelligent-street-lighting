import { Component, OnInit, Input } from '@angular/core';
import { Task, Device, DeviceEvent } from '~local/types'


@Component({
  selector: 'device-sc',
  templateUrl: './device-sc.component.html',
  styleUrls: ['./device-sc.component.scss']
})
export class DeviceScComponent implements OnInit {
  @Input() device!: Device;
  on = true
  powerlines = true

  constructor() { }

  ngOnInit(): void {
  }

}
