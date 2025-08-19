import { TestBed } from '@angular/core/testing';

import { AtlasShellEventsService } from './atlas-shell-events.service';

describe('AtlasShellEventsService', () => {
  let service: AtlasShellEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasShellEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
