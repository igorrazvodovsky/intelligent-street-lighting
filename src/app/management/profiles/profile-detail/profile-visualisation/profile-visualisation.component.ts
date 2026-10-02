import { Component, ElementRef, Input, OnChanges, OnDestroy } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Axis from 'd3-axis';
import * as d3Shape from 'd3-shape';
import * as d3TimeFormat from 'd3-time-format';
import { SeriesPoint } from '../profile-series';

@Component({
  selector: 'profile-visualisation',
  templateUrl: './profile-visualisation.component.html',
  styleUrls: ['./profile-visualisation.component.scss']
})
export class ProfileVisualisationComponent implements OnChanges, OnDestroy {
  @Input() public data: SeriesPoint[];
  // Smooth curve between levels, or steps
  @Input() public interpolated = false;
  // On the chart's noon-to-noon axis
  @Input() public sunset: Date;
  @Input() public sunrise: Date;

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
  public dark;
  public morningDark;
  public eveningDark;
  public sunRiseIcon;
  public sunSetIcon;
  private onResize = () => this.drawChart();

  constructor(public chartElem: ElementRef) {
  }

  public ngOnChanges(): void {
    if (!this.data) return;
    if (!this.svg) {
      this.initializeChart();
      window.addEventListener('resize', this.onResize);
    }
    this.drawChart();
  }

  public ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
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
      .attr("y", 0);

    this.morningDark = this.svgInner
      .append('rect')
      .attr('y', 0)
      .attr('height', this.height - this.marginY * 2)
      .attr('fill', 'hsla(0, 0%, 0%, 0.05)');
    this.eveningDark = this.svgInner
      .append('rect')
      .attr('y', 0)
      .attr('height', this.height - this.marginY * 2)
      .attr('fill', 'hsla(0, 0%, 0%, 0.05)');

    this.yScale = d3Scale
      .scaleLinear()
      .domain([100, 0])
      .range([0, this.height - 2 * this.marginY]);

    this.xScale = d3Scale.scaleTime()
      .domain([new Date(null, null, 1, 12, 0), new Date(null, null, 2, 12, 0)])

    this.yAxis = this.svgInner
      .append('g')
      .attr('id', 'y-axis')
      .attr('stroke-width', 0)
      .style("text-anchor", "start")

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
        .attr("stroke", "hsla(0, 0%, 0%, 0.1)")
        .attr("y1", 0)
        .attr("y2", this.height - this.marginY * 2)
        .attr("stroke-dasharray", "2,2");
      g.selectAll(".tick text").attr("dy", this.height - this.marginY * 2 + 8);
    }

    this.xAxis
      .call(customXAxis)

    const yAxis = d3Axis
      .axisLeft(this.yScale)
      .ticks(4);

    this.yAxis.call(yAxis);

    const midnight = this.xScale(new Date(null, null, 2, 0, 0));
    this.morningDark
      .attr("x", midnight)
      .attr("width", this.xScale(this.sunrise) - midnight)
    this.eveningDark
      .attr("x", this.xScale(this.sunset))
      .attr("width", midnight - this.xScale(this.sunset))

    // TODO: Replace "4" with something proper
    this.sunRiseIcon.attr("x", this.xScale(this.sunrise) + 4)
    this.sunSetIcon.attr("x", this.xScale(this.sunset) + 4)

    const stack = d3Shape.stack<SeriesPoint>()
      .keys(["static", "dynamic"])
      .order(d3Shape.stackOrderNone)
      .offset(d3Shape.stackOffsetNone);

    const stackedData = stack(this.data);

    let areaGen = d3Shape.area()
      .x((d: any) => this.xScale(new Date(d.data.date)))
      .y0((d) => this.yScale(d[0]))
      .y1((d) => this.yScale(d[1]))
      // Steps come as pairs of points at the same time, so straight lines draw them
      .curve(this.interpolated ? d3Shape.curveMonotoneX : d3Shape.curveLinear)


    const colorScale = d3Scale.scaleOrdinal()
      .domain(["static", "dynamic"])
      // TODO: take colours from CSS
      // Amber A400, A100
      .range(["#ffc400", "#ffe57f"]);

    this.svgInner
      .selectAll(".areas")
      .data(stackedData)
      .join("path")
      .attr("class", "areas")
      .attr("d", areaGen)
      .attr("fill", (d) => colorScale(d.key))

  }

}
