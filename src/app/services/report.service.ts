import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { nightSun } from '~local/management/profiles/profile-detail/sun-times';
import { City } from '../types';
import { CityService } from './city.service';
import { DeviceService } from './device.service';
import { lampsInGroup } from './device-tree';

// Columns of each row: the total, then the last four complete months, latest first
export type Columns = (number | null)[]

export interface ReportRow {
  group: string
  lamps: number
  h: Columns
  nominal: Columns
  real: Columns
  economy: Columns
}

export interface ReportStats {
  energy: number
  economy: number
  economyChange: number
  economyChangeSize: number
  worked: number
}

const TOTAL = 0;
const LATEST_MONTH = 1;
const PREVIOUS_MONTH = 2;

const HOUR = 3600000;

// Lights burn from sunset to sunrise, so a month's burn time is the sum of its
// nights at the city's latitude
function darkHours(city: City, month: Date): number {
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  let total = 0;
  for (let day = 1; day <= days; day++) {
    const night = nightSun(city, new Date(month.getFullYear(), month.getMonth(), day));
    total += (night.sunrise.getTime() - night.sunset.getTime()) / HOUR;
  }
  return Math.round(total);
}

const sumOf = (values: Columns) => values.reduce((total, value) => total + (value ?? 0), 0);

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  // The last four complete months, latest first
  readonly months = [1, 2, 3, 4].map(ago => new Date(new Date().getFullYear(), new Date().getMonth() - ago, 1));

  private _reports = this.cityService.data('reports')

  constructor(private cityService: CityService, private deviceService: DeviceService) { }

  // One row per reported group in the active city, with energy priced at
  // perLamp kWh per lamp-hour
  rows(perLamp$: Observable<number>): Observable<ReportRow[]> {
    return combineLatest([
      this.cityService.activeCity$,
      this._reports,
      this.deviceService.Devices,
      this.deviceService.Groups,
      perLamp$,
    ]).pipe(
      map(([city, reports, devices, groups, perLamp]) => {
        const hours = this.months.map(month => darkHours(city, month));
        return reports.map((report): ReportRow => {
          const group = groups.find(g => g.id === report.groupId);
          const lamps = lampsInGroup(devices, groups, report.groupId).length;
          const running = report.economy.map(economy => economy != null);
          const h = hours.map((value, i) => running[i] ? value : null);
          const nominal = h.map(value => value == null ? null : Math.round(lamps * value * +perLamp));
          const real = nominal.map((value, i) => value == null ? null : Math.round(value * (1 - report.economy[i] / 100)));
          const economy = sumOf(nominal) ? Math.round((1 - sumOf(real) / sumOf(nominal)) * 100) : null;
          return {
            group: group?.name ?? '',
            lamps,
            h: [sumOf(h), ...h],
            nominal: [sumOf(nominal), ...nominal],
            real: [sumOf(real), ...real],
            economy: [economy, ...report.economy],
          };
        });
      })
    );
  }

  stats(rows: ReportRow[]): ReportStats {
    const sum = (key: 'h' | 'nominal' | 'real', column: number) =>
      rows.reduce((total, row) => total + (row[key][column] ?? 0), 0);
    const economy = (column: number) =>
      Math.round((1 - sum('real', column) / sum('nominal', column)) * 100);
    const economyChange = economy(LATEST_MONTH) - economy(PREVIOUS_MONTH);
    return {
      energy: sum('real', TOTAL),
      economy: economy(TOTAL),
      economyChange,
      economyChangeSize: Math.abs(economyChange),
      worked: sum('h', TOTAL),
    };
  }
}
