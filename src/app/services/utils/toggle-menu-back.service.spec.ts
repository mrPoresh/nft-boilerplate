import { TestBed } from '@angular/core/testing';

import { ToggleMenuBackService } from './toggle-menu-back.service';

describe('ToggleMenuBackService', () => {
  let service: ToggleMenuBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleMenuBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
