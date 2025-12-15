import { TestBed } from '@angular/core/testing';

import { PathStateV19Service } from './path-state-v19.service';

describe('PathStateV19Service', () => {
  let service: PathStateV19Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathStateV19Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
