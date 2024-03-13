import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/localStorage/localStorage.service';
import { HttpService } from '../services/http/http.service';
import { UserInfo } from '../models/user-info.model';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  // Get the auth token from the store.
  const localStorageService = inject(LocalStorageService);
  const httpService = inject(HttpService);
  const userInfo: string | null = localStorageService.getItem('userInfo');
  const userInfoParsed: UserInfo | null = userInfo
    ? (JSON.parse(userInfo) as UserInfo)
    : null;

  let authRequest;
  if (userInfoParsed?.accessToken) {
    // If access token is available, create the authRequest.
    authRequest = request.clone({
      headers: request.headers.set(
        'Authorization',
        `Bearer ${userInfoParsed?.accessToken}`
      ),
    });
  } else {
    // If access token is not available, just use the original request.
    authRequest = request;
  }
  // send cloned request (or original request) with header to the next handler.
  return next(authRequest);
};
