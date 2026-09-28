// TODO: Child groups

import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { REPORT_GROUPS as DAUGAVPILS_REPORT_GROUPS } from '~local/../assets/data/daugavpils/reports';
import { REPORT_GROUPS as SOLNA_REPORT_GROUPS } from '~local/../assets/data/solna/reports';
import { CityService } from '~local/services/city.service';
import { cityScoped } from '~local/services/city-scoped';
import { ReportGroup } from '~local/types';
import { map } from 'rxjs/operators';

type Period = 'quarter' | 'month' | 'year' | 'custom'

const REPORT_GROUPS_MAP: { [key: string]: ReportGroup[] } = {
  'daugavpils': DAUGAVPILS_REPORT_GROUPS,
  'solna': SOLNA_REPORT_GROUPS,
};

// Index of each column in ReportGroup.data arrays
const TOTAL = 0;
const LATEST_MONTH = 1;
const PREVIOUS_MONTH = 2;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  nominalDefaultFormControl = new FormControl(0.08);
  period: Period = 'quarter';
  periodRange = new FormGroup({
    // Group creation date
    start: new FormControl(new Date(2020, 1)),
    end: new FormControl(new Date())
  });

  displayedColumns: any[] = ['property', 'total', '1', '2', '3', '4'];
  reports$ = cityScoped(this.cityService.activeCity$, REPORT_GROUPS_MAP);

  stats$ = this.reports$.pipe(
    map(groups => {
      const sum = (key: keyof ReportGroup['data'], column: number) =>
        groups.reduce((total, group) => total + (group.data[key][column] ?? 0), 0);
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
    })
  );

  constructor(private cityService: CityService) { }

}
