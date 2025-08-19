import { TestBed } from '@angular/core/testing';

import { AtlasShellUiService } from './atlas-shell-ui.service';

describe('AtlasShellUiService', () => {
  let service: AtlasShellUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasShellUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
