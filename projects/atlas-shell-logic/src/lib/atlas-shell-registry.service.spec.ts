import { TestBed } from '@angular/core/testing';

import { AtlasShellRegistryService } from './atlas-shell-registry.service';

describe('AtlasShellRegistryService', () => {
  let service: AtlasShellRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasShellRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
