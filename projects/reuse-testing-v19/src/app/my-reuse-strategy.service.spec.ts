import { TestBed } from '@angular/core/testing';

import { MyReuseStrategyService } from './my-reuse-strategy.service';

describe('MyReuseStrategyService', () => {
  let service: MyReuseStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyReuseStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
