// TODO: Child groups

import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DeviceService } from '~local/services/device.service';
import { ReportService } from '~local/services/report.service';
import { Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

type Period = 'quarter' | 'month' | 'year' | 'custom'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  nominalDefaultFormControl = new FormControl(0.08);
  period: Period = 'quarter';
  periodRange = new FormGroup({
    // Set to the city's earliest group creation date below
    start: new FormControl(new Date()),
    end: new FormControl(new Date())
  });

  months = this.reportService.months;

  displayedColumns: any[] = ['property', 'total', '1', '2', '3', '4'];

  rows$ = this.reportService.rows(
    this.nominalDefaultFormControl.valueChanges.pipe(startWith(this.nominalDefaultFormControl.value))
  );

  stats$ = this.rows$.pipe(map(rows => this.reportService.stats(rows)));

  constructor(private reportService: ReportService, private deviceService: DeviceService) {
    this.deviceService.Groups.pipe(takeUntil(this.destroy$)).subscribe(groups => {
      const created = groups.map(group => new Date(group.created).getTime());
      if (created.length) this.periodRange.patchValue({ start: new Date(Math.min(...created)) });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
