import { TestBed } from '@angular/core/testing';

import { AtlasStoreService } from './atlas-store.service';

describe('AtlasStoreService', () => {
  let service: AtlasStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
