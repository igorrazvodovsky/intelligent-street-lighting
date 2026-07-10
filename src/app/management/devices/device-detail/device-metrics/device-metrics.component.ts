import { Component, OnInit, OnDestroy } from '@angular/core';
import { MeasurementGroup } from '~local/types'
import { DeviceService } from '~local/services/device.service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'device-metrics',
  templateUrl: './device-metrics.component.html',
  styleUrls: ['./device-metrics.component.scss']
})
export class DeviceMetricsComponent implements OnInit, OnDestroy {
  chart: boolean = true;

  measurements: MeasurementGroup[]
  private destroy$ = new Subject<void>();

  constructor(private service: DeviceService) { }

  ngOnInit(): void {
    this.service.Measurements.pipe(takeUntil(this.destroy$)).subscribe(measurements => {
      this.measurements = measurements
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public toggleChart() {
    this.chart = !this.chart
  }

}
