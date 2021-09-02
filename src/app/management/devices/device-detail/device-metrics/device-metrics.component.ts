import { Component, OnInit } from '@angular/core';
import { MeasurementGroup } from '~local/types'
import { DeviceService } from '~local/services/device.service'

@Component({
  selector: 'device-metrics',
  templateUrl: './device-metrics.component.html',
  styleUrls: ['./device-metrics.component.scss']
})
export class DeviceMetricsComponent implements OnInit {
  chart: boolean = true;

  measurements: MeasurementGroup[]

  constructor(private service: DeviceService) { }

  ngOnInit(): void {
    this.service.Measurements.subscribe(measurements => {
      this.measurements = measurements
    });
  }

  public toggleChart() {
    this.chart = !this.chart
  }

}
