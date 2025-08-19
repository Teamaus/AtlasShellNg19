import { TestBed } from '@angular/core/testing';

import { AtlasContainerService } from './atlas-container.service';

describe('AtlasContainerService', () => {
  let service: AtlasContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
