import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'device-motion-sensor',
  templateUrl: './device-motion-sensor.component.html',
  styleUrls: ['./device-motion-sensor.component.scss']
})
export class DeviceMotionSensorComponent {
  options: string[] = ['6715', '6716', '6717'];

  constructor() { }

}
