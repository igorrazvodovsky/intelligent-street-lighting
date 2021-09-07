import { Component, OnInit, ElementRef, Input, OnChanges } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Shape from 'd3-shape';
import * as d3TimeFormat from 'd3-time-format';

@Component({
  selector: 'profile-visualisation',
  templateUrl: './profile-visualisation.component.html',
  styleUrls: ['./profile-visualisation.component.scss']
})
export class ProfileVisualisationComponent implements OnChanges {
  @Input() public data: any;

  private width = 700;
  private height = 200;
  private marginX = 16;
  private marginY = 32;

  public svg;
  public svgInner;
  public yScale;
  public xScale;
  public yAxis;
  public xAxis;
  public staticLineGroup;
  public dynamicLineGroup;
  public sunRise;
  public sunSet;
  public sunRiseIcon;
  public sunSetIcon;
  private sunRiseTime = new Date(null, null , 1, 6, 10)
  private sunSetTime = new Date(null, null, 1, 20, 30)

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
      .attr('height', this.height)

    this.svgInner = this.svg
      .append('g')
      .style('transform', 'translate(' + this.marginX + 'px, ' + this.marginY + 'px)');

    this.sunRiseIcon = this.svg.append("use")
      .attr("xlink:href", "#sunrise")
      .attr("width", 24)
      .attr("height", 24)
      .attr("x", 144)
      .attr("y", 0)

    this.sunSetIcon = this.svg.append("use")
      .attr("xlink:href", "#sunset")
      .attr("width", 24)
      .attr("height", 24)
      .attr("x", 294)
      .attr("y",0);

    this.sunRise = this.svgInner
      .append("line")
      .attr("y1", 0)
      .attr("y2", this.height)
      .style("stroke-width", 1)
      .style("stroke", "gold")
      .style("fill", "none");

    this.sunSet = this.svgInner
      .append("line")
      .attr("y1", 0)
      .attr("y2", this.height)
      .style("stroke-width", 1)
      .style("stroke", "gold")
      .style("fill", "none");

    this.yScale = d3Scale
      .scaleLinear()
      .domain([100, 0])
      .range([0, this.height - 2 * this.marginY]);

    this.xScale = d3Scale.scaleTime()
      .domain([new Date(null, null , 1, 0, 0), new Date(null, null , 2, 0, 0)])

    this.yAxis = this.svgInner
      .append('g')
      .attr('id', 'y-axis')
      .attr('stroke-width', 0)
      // .style('transform', 'translate(' + this.marginX + 'px,  0)')
      .style("text-anchor", "start")

    this.xAxis = this.svgInner
      .append('g')
      .attr('id', 'x-axis')
      .attr('stroke-width', 0)
      .style('transform', 'translate(0, ' + (this.height - 2 * this.marginY) + 'px)');

    this.staticLineGroup = this.svgInner
      .append('g')
      .append('path')
      .attr('id', 'line')
      .style('fill', 'hsla(0, 0%, 0%, 0.2)')
      // .style('fill', 'hsla(213, 97%, 53%, 0.3)')

    this.dynamicLineGroup = this.svgInner
      .append('g')
      .append('path')
      .attr('id', 'line')
      .style('fill', 'hsla(0, 0%, 0%, 0.1)')
  }

  private drawChart(): void {
    this.width = this.chartElem.nativeElement.getBoundingClientRect().width;
    this.svg.attr('width', this.width);

    this.xScale.range([this.marginX, this.width - 2 * this.marginX]);

    const xAxis = d3Axis
      .axisBottom(this.xScale)
      .tickFormat(d3TimeFormat.timeFormat('%H'));
    this.xAxis.call(xAxis);

    const yAxis = d3Axis
      .axisLeft(this.yScale)
      .ticks(4);

    this.yAxis.call(yAxis);

    const line = d3Shape
      .area()
      .x(d => d[0])
      .y0(this.height - this.marginY * 2)
      .y1(d => d[1])
      // .curve(d3Shape.curveBasis);

    this.sunRise
      .attr("x1", this.xScale(this.sunRiseTime))
      .attr("x2", this.xScale(this.sunRiseTime))

    this.sunSet
      .attr("x1", this.xScale(this.sunSetTime))
      .attr("x2", this.xScale(this.sunSetTime))

    // TODO: Replace "4" with something proper
    this.sunRiseIcon.attr("x", this.xScale(this.sunRiseTime) + 4)
    this.sunSetIcon.attr("x", this.xScale(this.sunSetTime) + 4)

    const staticPoints: [number, number][] = this.data.static.map(v => [
      this.xScale(new Date(v.date)),
      this.yScale(v.value),
    ]);

    const dynamicPoints: [number, number][] = this.data.dynamic.map((v, i) => [
      this.xScale(new Date(v.date)),
      this.yScale(v.value),
    ]);

    this.dynamicLineGroup.attr('d', line(dynamicPoints));
    this.staticLineGroup.attr('d', line(staticPoints));
  }

}
