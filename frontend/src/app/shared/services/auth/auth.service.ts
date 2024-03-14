import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHandler, HttpRequest } from '@angular/common/http';
import { LocalStorageService } from '../localStorage/localStorage.service';
import { UserInfo } from '../../models/user-info.model';
import * as AuthActions from '../../../shared/store/auth/auth.actions';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../shared/store/store.reducer';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInfo: string | null;
  userInfoParsed!: UserInfo;
  constructor(
    public httpService: HttpService,
    public localStorageService: LocalStorageService,
    public store: Store<fromApp.AppState>
  ) {
    this.userInfo = this.localStorageService.getItem('userInfo');
    this.userInfoParsed = this.userInfo ? JSON.parse(this.userInfo) : null;
  }

  addAuthorizationHeader(request: HttpRequest<any>): HttpRequest<any> {
    // Get the access token from the AuthService
    const accessToken = this.userInfoParsed?.accessToken;

    // If the token exists, add it to the request header
    if (accessToken) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    // Otherwise, return the original request
    return request;
  }

  refreshTokenAndRetry(request: HttpRequest<any>, next: any): Observable<any> {
    const payload = {
      address: this.userInfoParsed?.address,
      refreshToken: this.userInfoParsed?.refreshToken,
    };
    return this.httpService.post('api/token', payload).pipe(
      switchMap((res) => {
        // Update the access token in local storage and in the application state
        const userInfo = {
          accessToken: res.accessToken,
        };
        this.localStorageService.setItem('userInfo', JSON.stringify(userInfo));
        this.store.dispatch(new AuthActions.GetAccessToken(res.accessToken));

        // Clone the original request with the new token and retry it
        const updatedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${res.accessToken}`,
          },
        });
        return next(updatedRequest);
      }),
      catchError((error: any) => {
        // Handle token refresh failure
        console.log(error);
        return throwError(error);
      })
    );
  }
}
