import { TestBed } from '@angular/core/testing';

import { PathStateService } from './path-state.service';

describe('PathStateService', () => {
  let service: PathStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
