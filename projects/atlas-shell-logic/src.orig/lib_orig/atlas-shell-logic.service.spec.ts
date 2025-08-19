import { TestBed } from '@angular/core/testing';

import { AtlasShellLogicService } from './atlas-shell-logic.service';

describe('AtlasShellLogicService', () => {
  let service: AtlasShellLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasShellLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
