import { Component, ElementRef, Input, OnChanges } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Shape from 'd3-shape';

@Component({
  selector: 'area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss']
})
export class AreaChartComponent implements OnChanges {
  @Input() public data: { value: number, date: string }[];

  private width = 700;
  private height = 100;
  private margin = 0;

  public svg;
  public y;
  public x;
  public lineGroup;

  constructor(public chartElem: ElementRef) {
  }

  public ngOnChanges(changes): void {
    if (changes.hasOwnProperty('data') && this.data) {
      this.initializeChart();
      this.drawChart();

      window.addEventListener('resize', () => this.drawChart());
    }
  }

  private initializeChart(): void {
    this.svg = d3
      .select(this.chartElem.nativeElement)
      .append('svg')
      .attr('height', this.height);

    this.y = d3Scale
      .scaleLinear()
      .domain([d3Array.max(this.data, d => d.value) + 1, d3Array.min(this.data, d => d.value) - 1])
      .range([0, this.height - 2 * this.margin]);

    this.x = d3Scale.scaleTime().domain(d3Array.extent(this.data, d => new Date(d.date)));

    this.lineGroup = this.svg
      .append('g')
      .append('path')
      .attr('id', 'line')
      .style('fill', 'hsla(0, 0%, 0%, 0.2)')
  }

  private drawChart(): void {
    this.width = this.chartElem.nativeElement.getBoundingClientRect().width;
    this.svg.attr('width', this.width);

    this.x.range([this.margin, this.width - 2 * this.margin]);

    const line = d3Shape
      .area()
      .x(d => d[0])
      .y0(100)
      .y1(d => d[1])
      .curve(d3Shape.curveBasis);

    const points: [number, number][] = this.data.map(d => [
      this.x(new Date(d.date)),
      this.y(d.value),
    ]);

    this.lineGroup.attr('d', line(points));
  }

}
