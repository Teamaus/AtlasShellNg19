import { TestBed } from '@angular/core/testing';

import { AtlasSnapshotService } from './atlas-snapshot.service';

describe('AtlasSnapshotService', () => {
  let service: AtlasSnapshotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasSnapshotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
