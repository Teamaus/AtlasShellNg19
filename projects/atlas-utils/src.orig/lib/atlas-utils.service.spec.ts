import { TestBed } from '@angular/core/testing';

import { AtlasUtilsService } from './atlas-utils.service';

describe('AtlasUtilsService', () => {
  let service: AtlasUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
