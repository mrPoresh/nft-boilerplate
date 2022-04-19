import { TestBed } from '@angular/core/testing';

import { DetectDeviceService } from './detect-device.service';

describe('DetectDeviceService', () => {
  let service: DetectDeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetectDeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
