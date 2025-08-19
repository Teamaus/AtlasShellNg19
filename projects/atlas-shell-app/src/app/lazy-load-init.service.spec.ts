import { TestBed } from '@angular/core/testing';

import { LazyLoadInitService } from './lazy-load-init.service';

describe('LazyLoadInitService', () => {
  let service: LazyLoadInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LazyLoadInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
