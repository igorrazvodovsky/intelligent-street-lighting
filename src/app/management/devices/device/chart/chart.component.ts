import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'device-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

chart = new Chart({
    chart: {
        type: 'line',
        inverted: true,
        styledMode: true
    },
    title:{
        text:''
    },
      legend: {
        enabled: false
    },
    xAxis: {
      type: 'datetime',
      max: Date.UTC(2019, 0, 1, 7)
    },
    series: [{
      pointPlacement: 0.5,
      pointRange: 1000 * 60 * 60,
      data: [{
        x: Date.UTC(2019, 0, 1, 1),
        y: 7
      }, {
        x: Date.UTC(2019, 0, 1, 2),
        y: 8
      }, {
        x: Date.UTC(2019, 0, 1, 3),
        y: 6
      }, {
        x: Date.UTC(2019, 0, 1, 4),
        y: 5
      }, {
        x: Date.UTC(2019, 0, 1, 5),
        y: 7
      }, {
        x: Date.UTC(2019, 0, 1, 6),
        y: 6
      }],
      type: 'line'
    }],
    credits: {
      enabled: false
    }
  });

  constructor() { }

  ngOnInit(): void {
  }

}
