import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // add authorization header with jwt token if available
    const currentUser = JSON.parse(localStorage.getItem('userToken'));
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: currentUser.token
        }
      });
    }
    return next.handle(request);
  }
}
