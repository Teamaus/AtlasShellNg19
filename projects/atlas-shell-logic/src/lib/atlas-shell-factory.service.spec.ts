import { TestBed } from '@angular/core/testing';

import { AtlasShellFactoryService } from './atlas-shell-factory.service';

describe('AtlasShellFactoryService', () => {
  let service: AtlasShellFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasShellFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
