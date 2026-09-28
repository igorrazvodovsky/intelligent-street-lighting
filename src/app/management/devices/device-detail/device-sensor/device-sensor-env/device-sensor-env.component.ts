import { Component, OnInit } from '@angular/core';
import { Measurement } from '~local/types';

type SeriesShape = 'daytime' | 'nighttime' | 'traffic' | 'drifting' | 'flat' | 'draining';

const SERIES_SHAPES: { [name: string]: SeriesShape } = {
  'Temperature': 'daytime',
  'Humidity': 'nighttime',
  'Pressure': 'drifting',
  'Carbon monoxide (CO)': 'traffic',
  'Carbon monoxide (CO2)': 'traffic',
  'Nitric oxide (NO)': 'traffic',
  'Particulate matter (PM1)': 'traffic',
  'Particulate matter (PM2,5)': 'traffic',
  'Particulate matter (PM10)': 'traffic',
  'Noise level': 'traffic',
  'Battery level': 'draining',
  'Battery voltage': 'drifting',
};

// Relative swing around the current value, by hour of day (0-23)
function shapeAt(shape: SeriesShape, hour: number): number {
  const peak = (centre: number, width: number) => Math.exp(-((hour - centre) ** 2) / (2 * width ** 2));
  switch (shape) {
    case 'daytime': return 0.25 * Math.sin((hour - 9) / 24 * 2 * Math.PI);
    case 'nighttime': return -0.15 * Math.sin((hour - 9) / 24 * 2 * Math.PI);
    case 'traffic': return 0.4 * (peak(8, 1.5) + peak(17, 2)) - 0.2 * peak(3, 2.5);
    case 'drifting': return 0.004 * Math.sin(hour / 24 * Math.PI);
    case 'draining': return 0.15 * (1 - hour / 23);
    default: return 0;
  }
}

// Location-agnostic mock sensor readings: a shaped day with seeded noise,
// scaled so the latest hour matches the value in the panel header.
function hourlySeries(current: number, shape: SeriesShape, seed: number) {
  let state = seed * 9301 + 49297;
  const noise = () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280 - 0.5;
  };
  const hours = Array.from({ length: 24 }, (e, hour) => hour);
  const raw = hours.map(hour => 1 + shapeAt(shape, hour) + (shape === 'drifting' ? 0.0005 : 0.03) * noise());
  const scale = current / raw[raw.length - 1];
  return hours.map(hour => ({
    value: +(raw[hour] * scale).toFixed(2),
    date: new Date(null as any, null as any, 1, hour)
  }));
}

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
          value: 71,
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
          value: 60,
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
  // Last 24 hours per measurement, ending on the current value
  data = this.measurements.map((measurement, i) =>
    hourlySeries(measurement.values[0].value, SERIES_SHAPES[measurement.name] ?? 'flat', i + 1)
  );

  constructor() { }

  ngOnInit(): void {
  }

}
