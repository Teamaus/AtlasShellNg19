import { TestBed } from '@angular/core/testing';

import { AtlasShellModalEntityService } from './atlas-shell-modal-entity.service';

describe('AtlasShellModalEntityService', () => {
  let service: AtlasShellModalEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasShellModalEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
