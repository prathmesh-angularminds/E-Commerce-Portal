import { TestBed } from '@angular/core/testing';

import { ShouldLogOutGuard } from './should-log-out.guard';

describe('ShouldLogOutGuard', () => {
  let guard: ShouldLogOutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ShouldLogOutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
