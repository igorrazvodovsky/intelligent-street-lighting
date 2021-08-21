import { Component, OnInit, Input } from '@angular/core';
import { Task, Device, DeviceEvent } from '~local/types'
import { TaskService } from '~local/services/task.service';

@Component({
  selector: 'device-lamp',
  templateUrl: './device-lamp.component.html',
  styleUrls: ['./device-lamp.component.scss']
})
export class DeviceLampComponent implements OnInit {
  @Input() device!: Device;
  on = true;

  constructor() { }

  ngOnInit() {

  }

}
