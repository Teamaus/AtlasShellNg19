import { TestBed } from '@angular/core/testing';

import { AtlasReuseStrategyV19Service } from './atlas-reuse-strategy-v19.service';

describe('AtlasReuseStrategyV19Service', () => {
  let service: AtlasReuseStrategyV19Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasReuseStrategyV19Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
