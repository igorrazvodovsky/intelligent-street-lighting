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
  selector: 'device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent implements OnInit {
  chart: boolean = false;

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

  public toggleChart() {
    this.chart = !this.chart
  }

}
