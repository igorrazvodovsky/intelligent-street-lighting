// TODO: Child groups

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

const ELEMENT_DATA: any[] = [
  { position: 'Worked, h', total: '0', weight: 0, symbol: 0 },
  { position: 'Nominal energy, kWh', total: 0.08, weight: 0.08, symbol: 0.08 },
  { position: 'Real energy, kWh', total: 0, weight: 0, symbol: 0 },
  { position: 'Economy, %', total: 30, weight: 30, symbol: 30 },
];

type Period = 'quarter' | 'month' | 'year' | 'custom'

const DATA: any[] = [
  {
    group: 'Dzelzceļnieks',
    lamps: 161,
    data: {
      h: [8640, 719, 720, null, null],
      nominal: [9665, 2471, 2467, null, null],
      real: [6761, 1698, 1756, null, null],
      economy: [31, 29, 33, null, null],
    }
  },
  {
    group: 'Cietoksnis',
    lamps: 161,
    data: {
      h: [8640, 719, 720, 720, 712],
      nominal: [9665, 2471, 2467, 2411, 2671],
      real: [6761, 1698, 1756, 1745, 1698],
      economy: [31, 29, 33, 27, 25],
    }
  },
  {
    group: 'Svēto mocekļu Borisa un Gļeba pareizticīgo katedrāle',
    lamps: 161,
    data: {
      h: [8640, 719, 720, 720, 712],
      nominal: [9665, 2471, 2467, 2411, 2671],
      real: [6761, 1698, 1756, 1745, 1698],
      economy: [31, 29, 33, 27, 25],
    }
  }
]

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
  reports2 = DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
