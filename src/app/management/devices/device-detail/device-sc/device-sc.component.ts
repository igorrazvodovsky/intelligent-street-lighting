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

  relays = [
    {
      name: "RO1",
      profile: "Default",
      settings: {
        on: true,
        manual: false,
        inverted: false
      }
    },
        {
      name: "RO2",
      profile: "Default",
      settings: {
        on: true,
        manual: true,
        inverted: false
      }
    },
            {
      name: "RO3",
      profile: "Default",
      settings: {
        on: true,
        manual: false,
        inverted: false
      }
    },
                {
      name: "RO4",
      profile: "Default",
      settings: {
        on: false,
        manual: false,
        inverted: true
      }
    }

]

  constructor() { }

  ngOnInit(): void {
  }

}
