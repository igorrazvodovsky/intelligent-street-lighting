import { Component, OnInit } from '@angular/core';
import { Device, MeasurementGroup } from '../../../types'
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DeviceService } from '../../../services/device.service'

@Component({
  selector: 'device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent implements OnInit {
  device$!: Observable<Device>;
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DeviceService
  ) {}

  ngOnInit() {
    this.device$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getDevice(params.get('id')!))
    );
  }

  public toggleChart() {
    this.chart = !this.chart
  }

}
