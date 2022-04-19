import { TestBed } from '@angular/core/testing';

import { MoralisUserService } from './moralis-user.service';

describe('MoralisUserService', () => {
  let service: MoralisUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoralisUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
