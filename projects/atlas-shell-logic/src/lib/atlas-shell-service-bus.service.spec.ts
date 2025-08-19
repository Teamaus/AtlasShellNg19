import { TestBed } from '@angular/core/testing';

import { AtlasShellServiceBusService } from './atlas-shell-service-bus.service';

describe('AtlasShellServiceBusService', () => {
  let service: AtlasShellServiceBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasShellServiceBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
