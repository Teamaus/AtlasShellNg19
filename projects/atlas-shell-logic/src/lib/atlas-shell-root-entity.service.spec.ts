import { TestBed } from '@angular/core/testing';

import { AtlasShellRootEntityService } from './atlas-shell-root-entity.service';

describe('AtlasShellRootEntityService', () => {
  let service: AtlasShellRootEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasShellRootEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
