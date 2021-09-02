import { Component, HostBinding, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Shape from 'd3-shape';
import * as d3TimeFormat from 'd3-time-format';
import * as d3Pointer from 'd3-selection';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import { DeviceService } from '~local/services/device.service'
import { DeviceMetrics } from '~local/types';

@Component({
  selector: 'device-metrics-chart',
  templateUrl: './device-metrics-chart.component.html',
  styleUrls: ['./device-metrics-chart.component.scss']
})
export class DeviceMetricsChartComponent implements OnInit {
  private svg: any;
  private chart: any;
  private chartLines: any
  private line: any
  private width = 400;
  private height = 900;

  chartMargin = { top: 40, right: 16, bottom: 32, left: 16 };
  chartWidth = this.width - this.chartMargin.left - this.chartMargin.right;
  chartHeight = this.height - this.chartMargin.top - this.chartMargin.bottom;

  data: DeviceMetrics;
  dates: Date[] = [];
  availableDates: any

  groupValuesByY = {};

  metricsScale: any
  timeScale: any

  xAxis: any
  yAxis: any

  maxYAxisValue: number = -Infinity

  bucketNames: string[] = []
  colors: any
  mouseLine: any
  rectOverlay: any
  tooltip: any
  tooltipBackground: any
  tooltipText: any

  constructor(private service: DeviceService, public chartElem: ElementRef) { }

  ngOnInit(): void {
    this.service.Metrics.subscribe(metrics => {
      this.data = metrics
      this.createSvg();
      this.initializeChart();
      this.drawPlot();
    });
  }

  parseTime: any = d3TimeFormat.timeParse("%H:%M");

  private createSvg(): void {
    this.svg = d3
      .select(this.chartElem.nativeElement)
      .append("svg")
      .attr("id", "device-metrics")
      .attr("width", this.chartWidth + this.chartMargin.left + this.chartMargin.right)
      .attr("height", this.chartHeight + this.chartMargin.top + this.chartMargin.bottom)
      .append("g")
      .attr("transform", "translate(" + this.chartMargin.left + "," + this.chartMargin.top + ")")
      .attr("overflow", "visible");
  }

  private initializeChart(): void {

    // group all dates to get range for x axis later
    let dates = [];
    // group y axis values (value) of all lines to x axis (key)

    for (let key of Object.keys(this.data)) {
      this.data[key].forEach((bucketRecord: any) => {
        this.dates.push(this.parseTime(bucketRecord.date));

        !(this.parseTime(bucketRecord.date) in this.groupValuesByY) && (this.groupValuesByY[this.parseTime(bucketRecord.date)] = {}); // if date as key does not exist then create
        this.groupValuesByY[this.parseTime(bucketRecord.date)][key] = bucketRecord.conversion;
      });
    }

    this.availableDates = Object.keys(this.groupValuesByY)!;
    this.availableDates.sort(); // sort dates in increasing order

    for (let key of Object.keys(this.data)) {
      let maxYAxisValuePerBucket = Math.ceil(d3Array.max(this.data[key], (d: any) => d["conversion"]) as any);
      this.maxYAxisValue = Math.max(maxYAxisValuePerBucket, this.maxYAxisValue);
    }
  }


  private drawPlot(): void {

    // set the height of both y axis
    this.metricsScale = d3Scale.scaleLinear().range([this.chartWidth, 0]);

    // set the width of both x axis
    this.timeScale = d3Scale.scaleTime().range([0, this.chartHeight]);

    // create both x axis to be rendered
    this.xAxis = d3Axis
      .axisBottom(this.metricsScale)
    // .tickFormat(d => d + "%")

    // create the one y axis to be rendered
    this.yAxis = d3Axis.axisLeft<Date>(this.timeScale).tickFormat(d3TimeFormat.timeFormat("%H"));

    this.line = d3Shape
      .line()
      .y((d: any) => this.timeScale(this.parseTime(d.date)))
      .x((d: any) => this.metricsScale(d.conversion))
      .curve(d3Shape.curveCardinal);

    // create chart
    this.chart = this.svg
      .append("g")
      .attr("class", "chart")
      .attr("transform", "translate(" + this.chartMargin.left + "," + this.chartMargin.top + ")");

    // add data info to axis
    this.timeScale.domain(d3Array.extent(this.dates));
    this.metricsScale.domain([0, this.maxYAxisValue]);

    this.chartLines = this.svg
      .append("g")
      .attr("class", "chart")
      .attr("transform", "translate(" + this.chartMargin.left + "," + this.chartMargin.top + ")")
      .attr("clip-path", "url(#clip)");

    // add axis to chart
    this.chart
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + this.chartHeight + ")")
    // .call(this.xAxis);

    this.chart
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", "translate(" + this.chartWidth + ", 0)")
      .call(this.yAxis);

    // get list of bucket names
    for (let key of Object.keys(this.data)) {
      this.bucketNames.push(key);
    }

    // match colors to bucket name
    this.colors = d3Scale
      .scaleOrdinal()
      .domain(this.bucketNames)
      .range(["#a6cee3", "#e31a1c", "#fdbf6f", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99"]);

    // go through data and create/append lines to both charts
    for (let key of Object.keys(this.data)) {
      let bucket = this.data[key];
      this.chartLines
        .append("path")
        .datum(bucket)
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", (d: any) => this.colors(key))
        .attr("stroke-width", 1.5)
        .attr("d", this.line);
    }

    this.mouseLine = this.chart
      .append("path") // create vertical line to follow mouse
      .attr("class", "mouse-line")
      .attr("stroke", "#303030")
      .attr("stroke-width", 1)
      .attr("opacity", "0");

    this.rectOverlay = this.svg
      .append("rect")
      .attr("cursor", "move")
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .attr("class", "zoom")
      .attr("width", this.chartWidth)
      .attr("height", this.chartHeight)
      .attr("transform", "translate(" + this.chartMargin.left + "," + this.chartMargin.top + ")")
      .on("mousemove", this.mouseMove)
      .on("mouseover", this.mouseOver)
      .on("mouseout", this.mouseOut);

    this.tooltip = this.chart
      .append("g")
      .attr("class", "tooltip-wrapper")
      .attr("display", "none");
    this.tooltipBackground = this.tooltip.append("rect").attr("fill", "none");
    this.tooltipText = this.tooltip.append("text");
  }

  public mouseMove = () => {
    this.tooltip.attr("display", null);
    const mouse = d3Pointer.pointer(event);
    const dateOnMouse = this.timeScale.invert(mouse[1]);
    const nearestDateIndex = d3Array.bisect(this.availableDates, dateOnMouse.toString());

    // get the dates on either of the mouse cord
    let d0 = new Date(this.availableDates[nearestDateIndex - 1]);
    let d1 = new Date(this.availableDates[nearestDateIndex]);
    let closestDate;
    if (d0 < this.timeScale.domain()[0]) {
      closestDate = d1;
    } else if (d1 > this.timeScale.domain()[1]) {
      closestDate = d0;
    } else {
      // decide which date is closest to the mouse
      closestDate = dateOnMouse - +d0 > +d1 - dateOnMouse ? d1 : d0;
    }

    // @ts-ignore
    var nearestDateXValues = this.groupValuesByY[closestDate];
    var nearestDateYCord = this.timeScale(new Date(closestDate));

    this.mouseLine.attr("d", `M 0 ${nearestDateYCord} H ${this.chartHeight}`).attr("opacity", "0.3");

    this.tooltipText.selectAll(".tooltip-text-line").remove();
    this.chart.selectAll(".tooltip-line-circles").remove();
    var formatTime = d3TimeFormat.timeFormat("%H:%M");
    this.tooltipText
      .append("tspan")
      .attr("class", "tooltip-text-line")
      .attr("x", "5")
      .attr("y", "5")
      .attr("dy", "13px")
      .attr("font-weight", "bold")
      .style("font-size", "12px")
      .text(`${formatTime(closestDate)}`);

    for (let key of Object.keys(nearestDateXValues)) {
      this.chart
        .append("circle")
        .attr("class", "tooltip-line-circles")
        .attr("r", 5)
        .attr("fill", this.colors(key))
        .attr("cy", nearestDateYCord)
        .attr("cx", this.metricsScale(nearestDateXValues[key]));

      this.tooltipText
        .append("tspan")
        .attr("class", "tooltip-text-line")
        .attr("x", "5")
        .attr("dy", `14px`)
        .style("font-size", "12px")
        .text(`${key}: ${nearestDateXValues[key].toFixed(2)}`);
    }

    var tooltipWidth = this.tooltipText.node().getBBox().width;
    var tooltipHeight = this.tooltipText.node().getBBox().height;
    var rectOverlayWidth = this.rectOverlay.node().getBBox().width;
    this.tooltipBackground.attr("width", tooltipWidth + 10).attr("height", tooltipHeight + 10);
    if (nearestDateYCord + tooltipWidth >= rectOverlayWidth) {
      this.tooltip.attr("transform", "translate(" + 0 + "," + (nearestDateYCord - tooltipWidth - 20) + ")");
    } else {
      this.tooltip.attr("transform", "translate(" + 0 + "," + (nearestDateYCord + 10) + ")");
    }
  }

  public mouseOver = () => {
    this.mouseLine.attr("opacity", "1");
    this.tooltip.attr("display", null);
  }

  public mouseOut = () => {
    this.mouseLine.attr("opacity", "0");
    this.tooltip.attr("display", "none");
    this.chart.selectAll(".tooltip-line-circles").remove();
  }

}
