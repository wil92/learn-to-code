import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";
import {mergeMap, tap} from "rxjs/operators";

import {Environment} from "../injectors/environment";
import {LOCAL_STORAGE} from "../injectors/localstorage";

export interface UserDataResponse {
  username: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  user: UserDataResponse;
}

@Injectable()
export class AuthService {

  TOKEN = 'TOKEN';
  USER_DATA = 'USER_DATA';

  token: string;
  userData: UserDataResponse;

  constructor(
    private httpClient: HttpClient,
    private env: Environment,
    @Inject(LOCAL_STORAGE) private localStorage: Storage
  ) {
  }

  login(username, password): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.env.apiUrl}/auth/login`, {username, password}).pipe(
      tap((res) => this.saveUserData(res.access_token, res.user))
    );
  }

  logout() {
    this.localStorage.clear();
    this.userData = null;
    this.token = null;
  }

  register(username, password, email) {
    return this.httpClient.post<LoginResponse>(
      `${this.env.apiUrl}/auth/register`,
      {username, password, email})
      .pipe(mergeMap(() => this.login(username, password)));
  }

  saveUserData(token: string, userData: UserDataResponse) {
    this.localStorage.setItem(this.USER_DATA, JSON.stringify(userData));
    this.localStorage.setItem(this.TOKEN, token);
  }

  isAdmin(): boolean {
    return this.isLogin() && this.userData.role === 'admin';
  }

  isLogin(): boolean {
    this.getUserData();
    return !!this.token;
  }

  getUserData() {
    if (!this.token || !this.userData) {
      this.token = this.localStorage.getItem(this.TOKEN);
      try {
        this.userData = JSON.parse(this.localStorage.getItem(this.USER_DATA));
      } catch (ignore) {
      }
    }
    return {
      token: this.token,
      user: this.userData
    };
  }
}
