import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  // Get the auth token from the service.
  const authService = inject(AuthService);
  const authToken = authService.getAuthorizationToken();
  // Clone the request and replace the original headers with
  // cloned headers, updated with the authorization.
  const authRequest = request.clone({
    headers: request.headers.set('Authorization', `Bearer ${authToken}`),
  });
  // send cloned request with header to the next handler.
  return next(authRequest);
};
