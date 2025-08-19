import { TestBed } from '@angular/core/testing';

import { RootComponentService } from './root-component.service';

describe('RootComponentService', () => {
  let service: RootComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RootComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
