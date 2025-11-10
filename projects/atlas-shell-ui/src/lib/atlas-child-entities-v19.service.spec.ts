import { TestBed } from '@angular/core/testing';

import { AtlasChildEntitiesV19Service } from './atlas-child-entities-v19.service';

describe('AtlasChildEntitiesV19Service', () => {
  let service: AtlasChildEntitiesV19Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasChildEntitiesV19Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
