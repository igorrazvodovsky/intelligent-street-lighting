import { Component, ElementRef, Input, OnChanges } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Shape from 'd3-shape';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3TimeFormat from 'd3-time-format'

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnChanges {
  @Input() public data: { value: number, date: string }[];
  @Input() public index: number

  private width = 700;
  private height = 80;
  private margin = 0;
  private colourScale;
  public svg;
  public y;
  public x;
  public lineGroup;
  public xAxis;

  // TODO: One source for JS/CSS
  private colours = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00',
    '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'
  ]

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
    this.setColourScale();

    this.svg = d3
      .select(this.chartElem.nativeElement)
      .append('svg')
      .attr('height', this.height);

    this.y = d3Scale
      .scaleLinear()
      .domain([d3Array.max(this.data, d => d.value) + 1, d3Array.min(this.data, d => d.value) - 1])
      .range([0, this.height - 2 * this.margin]);

    this.x = d3Scale.scaleTime().domain([new Date(null, null, 1, 0, 0), new Date(null, null, 2, 0, 0)])

    this.lineGroup = this.svg
      .append('g')
      .append('path')
      .attr('id', 'line')
      .style('fill', 'none')
      .style('stroke', this.colourScale('' + this.index))
      .attr("stroke-width", 2)

    this.xAxis = this.svg
      .append('g')
      .attr('id', 'x-axis')

  }

  private drawChart(): void {
    this.width = this.chartElem.nativeElement.getBoundingClientRect().width;
    this.svg.attr('width', this.width);

    this.x.range([this.margin, this.width - 2 * this.margin]);

    const xAxis = d3Axis
      .axisBottom(this.x)
      .tickFormat(d3TimeFormat.timeFormat('%H'));

    const customXAxis = (g) => {
      g.call(xAxis);
      g.select(".domain").remove()
      g.selectAll(".tick text").remove()
      g.selectAll(".tick line")
        .attr("stroke", "hsla(0, 0%, 0%, 0.1)")
        .attr("y1", 0)
        .attr("y2", this.height)
      // .attr("stroke-dasharray", "1,2");
    }

    this.xAxis
      .call(customXAxis)

    const line = d3Shape
      .line()
      .x(d => d[0])
      .y(d => d[1])
      .curve(d3Shape.curveNatural);

    const points: [number, number][] = this.data.map(d => [
      this.x(new Date(d.date)),
      this.y(d.value),
    ]);

    this.lineGroup.attr('d', line(points));
  }
  private setColourScale() {
    // this.colourScale = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10);
    this.colourScale = d3Scale.scaleOrdinal().domain(["0", "1", "2", "3"]).range(this.colours);
  }
}
