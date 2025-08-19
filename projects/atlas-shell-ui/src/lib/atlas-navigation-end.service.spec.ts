import { TestBed } from '@angular/core/testing';

import { AtlasNavigationEndService } from './atlas-navigation-end.service';

describe('AtlasNavigationEndService', () => {
  let service: AtlasNavigationEndService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasNavigationEndService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
