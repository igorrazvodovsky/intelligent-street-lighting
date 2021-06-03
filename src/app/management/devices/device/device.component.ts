import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Options } from 'highcharts';

export interface MeasurementGroup {
  name: string,
  measurements: Measurement[]
}

export interface Measurement {
  name: string,
  units: string,
  values: [
    {
      value: number,
      date: Date
    }
  ],
  thresholds: {
    min?: number,
    max?: number
  }
}

@Component({
  selector: 'devices-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  measurements: MeasurementGroup[] = [
    {
      name: "Controller health",
      measurements: [
        {
          name: "Communication",
          units: "%",
          values: [
            {
              value: 60,
              date: new Date()
            }
          ],
          thresholds: {
            min: 50,
          }
        },
        {
          name: "Temperature",
          units: "°C",
          values: [
            {
              value: 32.2,
              date: new Date()
            }
          ],
          thresholds: {
            min: 50,
          }
        }
      ]
    },
    {
      name: "Controller health",
      measurements: [
        {
          name: "Communication",
          units: "%",
          values: [
            {
              value: 60,
              date: new Date()
            }
          ],
          thresholds: {
            min: 50,
          }
        },
        {
          name: "Temperature",
          units: "°C",
          values: [
            {
              value: 32.2,
              date: new Date()
            }
          ],
          thresholds: {
            min: 50,
          }
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
