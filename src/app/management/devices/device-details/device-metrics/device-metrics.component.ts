import { Component, OnInit } from '@angular/core';
import { MeasurementGroup } from '../../../../types'

@Component({
  selector: 'device-metrics',
  templateUrl: './device-metrics.component.html',
  styleUrls: ['./device-metrics.component.scss']
})
export class DeviceMetricsComponent implements OnInit {
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
