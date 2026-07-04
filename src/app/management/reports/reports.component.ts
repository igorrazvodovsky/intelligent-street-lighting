// TODO: Child groups

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { REPORT_GROUPS } from '~local/../assets/data/reports';

type Period = 'quarter' | 'month' | 'year' | 'custom'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  nominalDefaultFormControl = new FormControl(0.08);
  period: Period = 'quarter';
  periodRange = new FormGroup({
    // Group creation date
    start: new FormControl(new Date(2020, 1)),
    end: new FormControl(new Date())
  });

  displayedColumns: any[] = ['property', 'total', '1', '2', '3', '4'];
  reports2 = REPORT_GROUPS;

  constructor() { }

  ngOnInit(): void {
  }

}
