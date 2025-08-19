import { TestBed } from '@angular/core/testing';

import { WfRegistryService } from './wf-registry.service';

describe('WfRegistryService', () => {
  let service: WfRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WfRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
