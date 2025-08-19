import { TestBed } from '@angular/core/testing';

import { AtlasShellRoutingService } from './atlas-shell-routing.service';

describe('AtlasShellRoutingService', () => {
  let service: AtlasShellRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasShellRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
