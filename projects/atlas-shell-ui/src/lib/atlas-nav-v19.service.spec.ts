import { TestBed } from '@angular/core/testing';

import { AtlasNavV19Service } from './atlas-nav-v19.service';

describe('AtlasNavV19Service', () => {
  let service: AtlasNavV19Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasNavV19Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
