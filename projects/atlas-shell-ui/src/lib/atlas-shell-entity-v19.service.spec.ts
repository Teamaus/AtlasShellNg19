import { TestBed } from '@angular/core/testing';

import { AtlasShellEntityV19Service } from './atlas-shell-entity-v19.service';

describe('AtlasShellEntityV19Service', () => {
  let service: AtlasShellEntityV19Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasShellEntityV19Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
