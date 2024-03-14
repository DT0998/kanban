import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: any
) => {
  // Get the auth token from the store.
  const authService = inject(AuthService);

  const authRequest = authService.addAuthorizationHeader(request);

  // send cloned request (or original request) with header to the next handler.
  return next(authRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      // If the error is due to token expiration
      if (error.status === 401 && error.error.message === 'Token Expired') {
        // Attempt to refresh token and retry the request
        return authService.refreshTokenAndRetry(request, next);
      }
      return throwError(error);
    })
  );
};
