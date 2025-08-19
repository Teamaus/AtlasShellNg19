import { TestBed } from '@angular/core/testing';

import { AtlasShellWfService } from './atlas-shell-wf.service';

describe('AtlasShellWfService', () => {
  let service: AtlasShellWfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasShellWfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
