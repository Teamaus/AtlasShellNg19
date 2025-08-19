import { TestBed } from '@angular/core/testing';

import { WfManagerService } from './wf-manager.service';

describe('WfManagerService', () => {
  let service: WfManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WfManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
