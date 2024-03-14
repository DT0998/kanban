import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpRequest } from '@angular/common/http';
import { LocalStorageService } from '../localStorage/localStorage.service';
import * as AuthActions from '../../../shared/store/auth/auth.actions';
import * as fromApp from '../../../shared/store/store.reducer';
import { Store } from '@ngrx/store';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInfo!: string | any;
  constructor(
    public httpService: HttpService,
    public localStorageService: LocalStorageService,
    public store: Store<fromApp.AppState>
  ) {}

  addAuthorizationHeader(request: HttpRequest<any>): HttpRequest<any> {
    // Get the access token from the AuthService
    let accessToken;
    if (this.userInfo) {
      accessToken = this.userInfo.accessToken;
    }
    let requestAuth;
    // If the token exists, add it to the request header
    if (accessToken) {
      requestAuth = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } else {
      // Otherwise, return the original request
      requestAuth = request;
    }
    return requestAuth;
  }

  refreshTokenAndRetry(request: HttpRequest<any>, next: any): Observable<any> {
    const payload = {
      address: this.userInfo.address,
      refreshToken: this.userInfo.refreshToken,
    };
    return this.httpService.post('api/token', payload).pipe(
      switchMap((res) => {
        // Update the access token in local storage and in the application state
        const userInfo = {
          accessToken: res.accessToken,
        };
        this.localStorageService.setItem('userInfo', JSON.stringify(userInfo));
        // update the userInfoReceived object
        this.localStorageService.getItem('userInfo') as string;
        this.userInfo.accessToken = res.accessToken;
        console.log(this.userInfo)
        this.store.dispatch(new AuthActions.GetAccessToken(res.accessToken));

        // Clone the original request with the new token and retry it
        const updatedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.userInfo.accessToken}`,
          },
        });
        return next(updatedRequest);
      }),
      catchError((error: any) => {
        // Handle token refresh failure
        return throwError(error);
      })
    );
  }
}
