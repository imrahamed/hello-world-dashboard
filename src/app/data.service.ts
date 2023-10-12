import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  ScaleType } from '@swimlane/ngx-charts';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // The base URL of the API
  private apiUrl = environment.apiUrl;
  public colorScheme = {
    name: 'vivid',
    selectable: true,
    group: ScaleType.Linear,
    domain: [
      '#3f51b5',
      '#2196f3',
      '#ff5722',
      '#00b862',
      '#afdf0a',
      '#a7b61a',
      '#f3e562',
      '#ff9800',
      '#ff4514',
    ],
  };

  constructor(private http: HttpClient) { }

  /**
   * Fetches graph data within the specified time range.
   * @param fromTimestamp The start of the time range.
   * @param toTimestamp The end of the time range.
   * @returns An Observable containing the graph data.
   */
  getGraphData(fromTimestamp: number, toTimestamp: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/graphData?fromTimestamp=${fromTimestamp}&toTimestamp=${toTimestamp}`);
  }

  /**
   * Retrieves counts of various metrics within a specified time range.
   * @param fromTimestamp The start of the time range.
   * @param toTimestamp The end of the time range.
   * @returns An Observable containing the counts data.
   */
  getCounts(fromTimestamp: number, toTimestamp: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/counts?fromTimestamp=${fromTimestamp}&toTimestamp=${toTimestamp}`);
  }

  /**
   * Retrieves paginated logs within a specified time range.
   * @param fromTimestamp The start of the time range.
   * @param toTimestamp The end of the time range.
   * @param page The page number.
   * @param pageSize The number of logs per page.
   * @returns An Observable containing the logs data.
   */
  getLogs(fromTimestamp: number, toTimestamp: number, page: number, pageSize: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/logs?fromTimestamp=${fromTimestamp}&toTimestamp=${toTimestamp}&page=${page}&pageSize=${pageSize}`);
  }
}
