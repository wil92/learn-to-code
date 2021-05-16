import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {Environment} from "../injectors/environment";
import {LOCAL_STORAGE} from "../injectors/localstorage";
import {HttpClientModule} from "@angular/common/http";


describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        AuthService,
        {provide: Environment, useValue: {}},
        {provide: LOCAL_STORAGE, useValue: {}},
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
