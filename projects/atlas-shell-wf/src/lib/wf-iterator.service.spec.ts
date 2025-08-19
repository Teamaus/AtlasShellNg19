import { TestBed } from '@angular/core/testing';

import { WfIteratorService } from './wf-iterator.service';

describe('WfIteratorService', () => {
  let service: WfIteratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WfIteratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
