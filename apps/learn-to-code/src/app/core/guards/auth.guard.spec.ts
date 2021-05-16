import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {RouterTestingModule} from "@angular/router/testing";
import {AuthService} from "../services/auth.service";

class AuthServiceStub {
}

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard, {provide: AuthService, useClass: AuthServiceStub}]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
