import { TestBed } from '@angular/core/testing';

import { AtlasRootStoreService } from './atlas-root-store.service';

describe('AtlasRootStoreService', () => {
  let service: AtlasRootStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasRootStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
