import { Component } from '@angular/core';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';
import * as shape from 'd3-shape';
import { endOfMonth, subHours, subDays } from 'date-fns';
import { DataService } from '../data.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent {
  graphData: any[] = [];
  counts = [];

  // Graph options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date / Time';
  yAxisLabel: string = 'Count';
  timeline: boolean = true;
  cardColor: string = '#647c8a';
  gradient: boolean = true;
  height = 500;
  width = 400;
  legendPosition = LegendPosition.Below;
  colorScheme: Color = this.dataService.colorScheme;
  curve = shape.curveCatmullRom;

  ranges = {
    'Last 7 Days': [subDays(new Date(), 7), new Date()],
    'Last 24 Hours': [subHours(new Date(), 24), new Date()],
    'Last 30 Days':  [subDays(new Date(), 30), new Date()],
  };
  nzDefaultOpenValue: Date[];
  constructor(private dataService: DataService) {
    this.nzDefaultOpenValue = [subHours(new Date(), 24), new Date()];
    this.fetchGraphData();
    this.fetchCounts();
  }

  /**
   * Handler for window resize event. Adjusts the width of the graph.
   * @param {Event} event - The resize event.
   */
  onResize(event: Event): void {
    this.width = (event.target as Window).innerWidth / 1.35;
  }

  /**
   * Event handler for date range selection change.
   * @param {Date[]} result - An array containing the selected date range.
   */
  onChange(result: Date[]): void {
    console.log('From: ', result[0], ', to: ', result[1]);
    this.fetchGraphData(result[0].valueOf(), result[1].valueOf());
    this.fetchCounts(result[0].valueOf(), result[1].valueOf());
  }

  /**
   * Fetches graph data from the server.
   * @param {number} fromTimestamp - The start timestamp (default is 24 hours ago).
   * @param {number} toTimestamp - The end timestamp (default is now).
   */
  fetchGraphData(
    fromTimestamp = subHours(new Date(), 24).valueOf(),
    toTimestamp = new Date().valueOf()
  ): void {
    const handleResponse = (res: any) => {
      this.graphData = res.logs;
    };

    this.dataService
      .getGraphData(fromTimestamp, toTimestamp)
      .subscribe(handleResponse);
  }

  /**
   * Fetches counts data from the server.
   * @param {number} fromTimestamp - The start timestamp (default is 24 hours ago).
   * @param {number} toTimestamp - The end timestamp (default is now).
   */
  fetchCounts(
    fromTimestamp = subHours(new Date(), 24).valueOf(),
    toTimestamp = new Date().valueOf()
  ): void {
    const handleResponse = (res: any) => {
      this.counts = res;
    };

    this.dataService
      .getCounts(fromTimestamp, toTimestamp)
      .subscribe(handleResponse);
  }
}
