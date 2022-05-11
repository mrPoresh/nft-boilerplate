import { TestBed } from '@angular/core/testing';

import { MoralisNftService } from './moralis-nft.service';

describe('MoralisNftService', () => {
  let service: MoralisNftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoralisNftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
