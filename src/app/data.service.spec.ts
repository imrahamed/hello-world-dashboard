import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifies that no requests are outstanding after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getGraphData', () => {
    it('should return graph data', () => {
      const fromTimestamp = 1633939200000; // Example start timestamp
      const toTimestamp = 1634025600000;   // Example end timestamp

      const expectedData = [{ /* Your expected data goes here */ }];

      service.getGraphData(fromTimestamp, toTimestamp).subscribe(data => {
        expect(data).toEqual(expectedData);
      });

      const req = httpTestingController.expectOne(`${service['apiUrl']}/graphData?fromTimestamp=${fromTimestamp}&toTimestamp=${toTimestamp}`);
      expect(req.request.method).toBe('GET');

      req.flush(expectedData); // Simulate a successful response
    });
  });

  describe('getCounts', () => {
    it('should return counts data', () => {
      const fromTimestamp = 1633939200000; // Example start timestamp
      const toTimestamp = 1634025600000;   // Example end timestamp

      const expectedData = [{ /* Your expected data goes here */ }];

      service.getCounts(fromTimestamp, toTimestamp).subscribe(data => {
        expect(data).toEqual(expectedData);
      });

      const req = httpTestingController.expectOne(`${service['apiUrl']}/counts?fromTimestamp=${fromTimestamp}&toTimestamp=${toTimestamp}`);
      expect(req.request.method).toBe('GET');

      req.flush(expectedData); // Simulate a successful response
    });
  });

  describe('getLogs', () => {
    it('should return paginated logs data', () => {
      const fromTimestamp = 1633939200000; // Example start timestamp
      const toTimestamp = 1634025600000;   // Example end timestamp
      const page = 1;
      const pageSize = 10;

      const expectedData = [{ /* Your expected data goes here */ }];

      service.getLogs(fromTimestamp, toTimestamp, page, pageSize).subscribe(data => {
        expect(data).toEqual(expectedData);
      });

      const req = httpTestingController.expectOne(`${service['apiUrl']}/logs?fromTimestamp=${fromTimestamp}&toTimestamp=${toTimestamp}&page=${page}&pageSize=${pageSize}`);
      expect(req.request.method).toBe('GET');

      req.flush(expectedData); // Simulate a successful response
    });
  });
});
