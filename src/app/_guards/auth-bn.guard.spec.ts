import { TestBed, async, inject } from '@angular/core/testing';

import { AuthBNGuard } from './auth-bn.guard';

describe('AuthBNGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthBNGuard]
    });
  });

  it('should ...', inject([AuthBNGuard], (guard: AuthBNGuard) => {
    expect(guard).toBeTruthy();
  }));
});
