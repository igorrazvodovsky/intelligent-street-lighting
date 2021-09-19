import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Shape from 'd3-shape';
import * as d3TimeFormat from 'd3-time-format';

@Component({
  selector: 'time-axis',
  templateUrl: './time-axis.component.html',
  styleUrls: ['./time-axis.component.scss']
})


export class TimeAxisComponent implements OnInit {

  private width = 700;
  private height = 32;
  private marginX = 8;
  private marginY = 0;

  public svg;
  public svgInner;
  public xScale;
  public xAxis;

  constructor(public chartElem: ElementRef) {
  }

  public ngOnInit(): void {
    this.initializeChart();
    this.drawChart();
    window.addEventListener('resize', () => this.drawChart());
  }

  private initializeChart(): void {
    this.svg = d3
      .select(this.chartElem.nativeElement)
      .append('svg')
      .attr('height', this.height)

    this.svgInner = this.svg
      .append('g')
      .style('transform', 'translate(' + this.marginX + 'px, ' + this.marginY + 'px)');

    this.xScale = d3Scale.scaleTime()
      .domain([new Date(null, null, 1, 0, 0), new Date(null, null, 2, 0, 0)])

    this.xAxis = this.svgInner
      .append('g')
      .attr('id', 'x-axis')
  }

  private drawChart(): void {
    this.width = this.chartElem.nativeElement.getBoundingClientRect().width;
    this.svg.attr('width', this.width);

    this.xScale.range([this.marginX, this.width - 2 * this.marginX]);

    const xAxis = d3Axis
      .axisBottom(this.xScale)
      .tickFormat(d3TimeFormat.timeFormat('%H'));

    const customXAxis = (g) => {
      g.call(xAxis);
      g.select(".domain").remove();
      g.selectAll(".tick line")
        .attr("transform", "translate(0, 24)")
    }

    this.xAxis
      .call(customXAxis)

    const stack = d3Shape.stack()
      .keys(["static", "dynamic"])
      .order(d3Shape.stackOrderNone)
      .offset(d3Shape.stackOffsetNone);
  }

}
