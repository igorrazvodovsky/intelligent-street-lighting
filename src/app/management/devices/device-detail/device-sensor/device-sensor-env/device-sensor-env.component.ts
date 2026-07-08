import { Component, OnInit } from '@angular/core';
import { Measurement } from '~local/types';
import { AREA } from '~local/../assets/data/daugavpils/area-energy';

@Component({
  selector: 'device-sensor-env',
  templateUrl: './device-sensor-env.component.html',
  styleUrls: ['./device-sensor-env.component.scss']
})
export class DeviceSensorEnvComponent implements OnInit {
  measurements: Measurement[] = [
    {
      name: "Temperature",
      units: "°C",
      values: [
        {
          value: 20,
          date: new Date()
        }
      ]
    },
    {
      name: "Humidity",
      units: "%",
      values: [
        {
          value: 0.71,
          date: new Date()
        }
      ]
    },
    {
      name: "Pressure",
      units: "hPa",
      values: [
        {
          value: 1007,
          date: new Date()
        }
      ]
    },
    {
      name: "Carbon monoxide (CO)",
      units: "ppm",
      values: [
        {
          value: 0.27,
          date: new Date()
        }
      ]
    },
    {
      name: "Carbon monoxide (CO2)",
      units: "ppm",
      values: [
        {
          value: 228,
          date: new Date()
        }
      ]
    },
    {
      name: "Nitric oxide (NO)",
      units: "ppm",
      values: [
        {
          value: 0.28,
          date: new Date()
        }
      ]
    },
    {
      name: "Particulate matter (PM1)",
      units: "μm",
      values: [
        {
          value: 0.28,
          date: new Date()
        }
      ]
    },
    {
      name: "Particulate matter (PM2,5)",
      units: "μm",
      values: [
        {
          value: 1.81,
          date: new Date()
        }
      ]
    },
    {
      name: "Particulate matter (PM10)",
      units: "μm",
      values: [
        {
          value: 3.11,
          date: new Date()
        }
      ]
    },
    {
      name: "Noise level",
      units: "dBa",
      values: [
        {
          value: 70,
          date: new Date()
        }
      ]
    },
    {
      name: "Battery level",
      units: "%",
      values: [
        {
          value: 0.6,
          date: new Date()
        }
      ]
    },
    {
      name: "Battery voltage",
      units: "V",
      values: [
        {
          value: 4.18,
          date: new Date()
        }
      ]
    }
  ];
  data = AREA;

  constructor() { }

  ngOnInit(): void {
  }

}
