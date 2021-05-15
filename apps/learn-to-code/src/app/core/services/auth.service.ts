import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";
import {mergeMap, tap} from "rxjs/operators";

import {Environment} from "../injectors/environment";
import {LOCAL_STORAGE} from "../injectors/localstorage";

export interface LoginResponse {
  access_token: string;
}

@Injectable()
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private env: Environment,
    @Inject(LOCAL_STORAGE) private localStorage: Storage
  ) {
  }

  login(username, password): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.env.apiUrl}/auth/login`, {username, password}).pipe(
      tap((res) => this.saveUserData(res.access_token))
    );
  }

  register(username, password, email) {
    return this.httpClient.post<LoginResponse>(
      `${this.env.apiUrl}/auth/register`,
      {username, password, email})
      .pipe(mergeMap(() => this.login(username, password)));
  }

  saveUserData(token) {
    this.localStorage.setItem('TOKEN', token);
  }

  getUserData() {
    return {
      token: this.localStorage.getItem('TOKEN')
    };
  }
}
