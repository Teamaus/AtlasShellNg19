import { TestBed } from '@angular/core/testing';

import { AtlasShellComponentService } from './atlas-shell-component.service';

describe('AtlasShellComponentService', () => {
  let service: AtlasShellComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasShellComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
