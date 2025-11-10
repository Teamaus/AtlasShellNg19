import { TestBed } from '@angular/core/testing';

import { AtlasShellNavigationV19Service } from './atlas-shell-navigation-v19.service';

describe('AtlasShellNavigationV19Service', () => {
  let service: AtlasShellNavigationV19Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasShellNavigationV19Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
