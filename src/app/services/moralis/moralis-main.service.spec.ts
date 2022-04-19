import { TestBed } from '@angular/core/testing';

import { MoralisMainService } from './moralis-main.service';

describe('MoralisMainService', () => {
  let service: MoralisMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoralisMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
