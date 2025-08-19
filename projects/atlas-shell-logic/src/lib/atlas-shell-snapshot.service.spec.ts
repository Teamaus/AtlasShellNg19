import { TestBed } from '@angular/core/testing';

import { AtlasShellSnapshotService } from './atlas-shell-snapshot.service';

describe('AtlasShellSnapshotService', () => {
  let service: AtlasShellSnapshotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasShellSnapshotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
