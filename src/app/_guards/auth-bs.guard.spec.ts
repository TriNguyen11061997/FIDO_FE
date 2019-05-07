import { TestBed, async, inject } from '@angular/core/testing';

import { AuthBSGuard } from './auth-bs.guard';

describe('AuthBSGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthBSGuard]
    });
  });

  it('should ...', inject([AuthBSGuard], (guard: AuthBSGuard) => {
    expect(guard).toBeTruthy();
  }));
});
