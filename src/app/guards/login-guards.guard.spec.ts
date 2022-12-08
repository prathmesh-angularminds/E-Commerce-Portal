import { TestBed } from '@angular/core/testing';

import { LoginGuardsGuard } from './login-guards.guard';

describe('LoginGuardsGuard', () => {
  let guard: LoginGuardsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginGuardsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
