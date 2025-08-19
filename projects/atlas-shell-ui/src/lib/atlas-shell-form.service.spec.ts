import { TestBed } from '@angular/core/testing';

import { AtlasShellFormService } from './atlas-shell-form.service';

describe('AtlasShellFormService', () => {
  let service: AtlasShellFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasShellFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
