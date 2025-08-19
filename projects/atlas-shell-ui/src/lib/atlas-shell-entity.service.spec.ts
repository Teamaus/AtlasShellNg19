import { TestBed } from '@angular/core/testing';

import { AtlasShellEntityService } from './atlas-shell-entity.service';

describe('AtlasShellEntityService', () => {
  let service: AtlasShellEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasShellEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
