import { TestBed } from '@angular/core/testing';

import { AtlasStoreBaseService } from './atlas-store-base.service';

describe('AtlasStoreBaseService', () => {
  let service: AtlasStoreBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasStoreBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
