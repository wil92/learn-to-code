import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";

import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request;
    if (this.authService.isLogin()) {
      const {token} = this.authService.getUserData();
      authReq = request.clone({headers: request.headers.set('Authorization', `Bearer ${token}`)});
    }
    return next.handle(authReq).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.router.navigate(['/login']);
      }
      return throwError(error);
    }));
  }
}
