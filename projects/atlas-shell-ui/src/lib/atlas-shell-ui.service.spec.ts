import { TestBed } from '@angular/core/testing';

import { AtlasShellUIService } from './atlas-shell-ui.service';

describe('AtlasShellUIService', () => {
  let service: AtlasShellUIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasShellUIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
