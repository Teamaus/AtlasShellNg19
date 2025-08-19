import { TestBed } from '@angular/core/testing';

import { AtlasShellEntityFactoryService } from './atlas-shell-entity-factory.service';

describe('AtlasShellEntityFactoryService', () => {
  let service: AtlasShellEntityFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasShellEntityFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
