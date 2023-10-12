/**
 * Component for displaying logs.
 */
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { endOfMonth, subHours, subDays, format } from 'date-fns';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

interface logData {
  _id: string;
  userId: String;
  timestamp: String;
  status: String;
  error: any;
  request: any;
  response: any;
}

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
})
export class LogsComponent implements OnInit {
  listOfData: logData[] = [];
  expandSet = new Set<String>();
  nzDefaultOpenValue: Date[];
  ranges = {
    'Last 7 Days': [subDays(new Date(), 7), new Date()],
    'Last 24 Hours': [subHours(new Date(), 24), new Date()],
    'Last 30 Days':  [subDays(new Date(), 30), new Date()]
  };
  loading: boolean = true;
  pageSize: number = 50;
  page: number = 1;
  toTimestamp: number;
  fromTimestamp: number;
  total: number = 0;
  constructor(private dataService: DataService) {
    this.fromTimestamp = subHours(new Date(), 24).valueOf();
    this.toTimestamp = new Date().valueOf();
    this.nzDefaultOpenValue = [subHours(new Date(), 24), new Date()];
    this.fetchLogs();
  }

  /**
   * Function to handle expand/collapse of table rows.
   * @param id - Identifier of the row.
   * @param checked - Whether the row is expanded or collapsed.
   */
  onExpandChange(id: String, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  /**
   * Function to display code in a readable format.
   * @param code - Code to be displayed.
   * @returns Formatted code.
   */
  showCode(code: any) {
    return code && typeof code !== 'string' ? JSON.stringify(code) : code;
  }

  ngOnInit(): void {}

  /** Function to fetch logs from the server. */
  fetchLogs() {
    this.loading = true;
    this.dataService
      .getLogs(this.fromTimestamp, this.toTimestamp, this.page, this.pageSize)
      .subscribe((res: any) => {
        console.log(res);
        this.loading = false;
        this.listOfData = res.logs;
        this.total = res.total;
        this.loading = false;
      });
  }

  /**
   * Function to format a date.
   * @param date - Date to be formatted.
   * @returns Formatted date string.
   */
  formatDate(date: any) {
    return date && format(new Date(date), 'MMM d, y, h:mm:ss a');
  }

  /**
   * Function to handle date range changes.
   * @param result - Selected date range.
   */
  onChange(result: Date[]): void {
    console.log('From: ', result[0], ', to: ', result[1]);
    this.fromTimestamp = result[0].valueOf();
    this.toTimestamp = result[1].valueOf();
    this.fetchLogs();
  }

  /**
   * Function to handle table pagination and sorting.
   * @param params - Table query parameters.
   */
  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, filter } = params;
    if (pageSize !== this.pageSize) {
      this.page = 1;
    } else {
      this.page = pageIndex;
    }
    this.pageSize = pageSize;
    this.fetchLogs();
  }
}
