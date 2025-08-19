import { TestBed } from '@angular/core/testing';

import { AtlasShellSelectorService } from './atlas-shell-selector.service';

describe('AtlasShellSelectorService', () => {
  let service: AtlasShellSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasShellSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
