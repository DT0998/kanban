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
      return authService.handleError(error, request, next);
    })
  );
};
