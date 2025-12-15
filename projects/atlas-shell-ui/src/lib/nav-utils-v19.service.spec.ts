import { TestBed } from '@angular/core/testing';

import { NavUtilsV19Service } from './nav-utils-v19.service';

describe('NavUtilsV19Service', () => {
  let service: NavUtilsV19Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavUtilsV19Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
