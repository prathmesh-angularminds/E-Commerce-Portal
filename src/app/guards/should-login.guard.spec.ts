import { TestBed } from '@angular/core/testing';

import { ShouldLoginGuard } from './should-login.guard';

describe('ShouldLoginGuard', () => {
  let guard: ShouldLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ShouldLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
