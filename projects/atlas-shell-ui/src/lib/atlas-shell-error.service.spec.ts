import { TestBed } from '@angular/core/testing';

import { AtlasShellErrorService } from './atlas-shell-error.service';

describe('AtlasShellErrorService', () => {
  let service: AtlasShellErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasShellErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
