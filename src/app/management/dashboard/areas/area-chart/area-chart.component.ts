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
  public areaGroup;

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
    d3.select(this.chartElem.nativeElement).selectAll('*').remove();

    this.svg = d3
      .select(this.chartElem.nativeElement)
      .append('svg')
      .attr('height', this.height);

    this.y = d3Scale
      .scaleLinear()
      .domain([d3Array.max(this.data, d => d.value) + 1, d3Array.min(this.data, d => d.value) - 1])
      .range([0, this.height - 2 * this.margin]);

    this.x = d3Scale.scaleTime().domain(d3Array.extent(this.data, d => new Date(d.date)));

    const defs = this.svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', 'area-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    // Using a more muted, desaturated blue (#78a3c8) so it doesn't attract too much attention
    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#78a3c8')
      .attr('stop-opacity', 0.4);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#78a3c8')
      .attr('stop-opacity', 0.05);

    this.areaGroup = this.svg
      .append('g')
      .append('path')
      .attr('id', 'area')
      .style('fill', 'url(#area-gradient)');

    this.lineGroup = this.svg
      .append('g')
      .append('path')
      .attr('id', 'line')
      .style('fill', 'none')
      .style('stroke', '#78a3c8')
      .style('stroke-width', '1px');
  }

  private drawChart(): void {
    this.width = this.chartElem.nativeElement.getBoundingClientRect().width;
    this.svg.attr('width', this.width);

    this.x.range([this.margin, this.width - 2 * this.margin]);

    const area = d3Shape
      .area()
      .x(d => d[0])
      .y0(100)
      .y1(d => d[1])
      .curve(d3Shape.curveBasis);

    const line = d3Shape
      .line()
      .x(d => d[0])
      .y(d => d[1])
      .curve(d3Shape.curveBasis);

    const points: [number, number][] = this.data.map(d => [
      this.x(new Date(d.date)),
      this.y(d.value),
    ]);

    this.areaGroup.attr('d', area(points));
    this.lineGroup.attr('d', line(points));
  }
}
