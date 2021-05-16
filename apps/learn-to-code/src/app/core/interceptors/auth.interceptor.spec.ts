import { TestBed } from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

import { AuthInterceptor } from './auth.interceptor';
import {AuthService} from "../services/auth.service";
import {Environment} from "../injectors/environment";
import {LOCAL_STORAGE} from "../injectors/localstorage";

class AuthServiceStub {
}

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, HttpClientTestingModule],
    providers: [
      AuthInterceptor,
      {provide: AuthService, userClass: AuthServiceStub},
      {provide: Environment, useValue: {}},
      {provide: LOCAL_STORAGE, useValue: {}}
    ]
  }));

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
