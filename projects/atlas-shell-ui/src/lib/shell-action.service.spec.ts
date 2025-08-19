import { TestBed } from '@angular/core/testing';

import { ShellActionService } from './shell-action.service';

describe('ShellActionService', () => {
  let service: ShellActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShellActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
