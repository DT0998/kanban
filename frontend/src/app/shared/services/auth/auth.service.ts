import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpRequest } from '@angular/common/http';
import { LocalStorageService } from '../localStorage/localStorage.service';
import * as AuthActions from '../../../shared/store/auth/auth.actions';
import * as fromApp from '../../../shared/store/store.reducer';
import { Store } from '@ngrx/store';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInfoAuth!: string | any;
  constructor(
    public httpService: HttpService,
    public localStorageService: LocalStorageService,
    public store: Store<fromApp.AppState>,
    private toastr: ToastrService
  ) {
    const userInfo = this.localStorageService.getItem('userInfo') as string;
    const userInfoParse = JSON.parse(userInfo);
    if (userInfoParse) {
      this.userInfoAuth = userInfoParse;
      if (!userInfoParse.initialLogin) {
        this.toastr.error('Please refresh the page and try again');
      }
    }
  }

  addAuthorizationHeader = (request: HttpRequest<any>): HttpRequest<any> => {
    // Get the access token from the AuthService
    let accessToken;
    if (this.userInfoAuth) {
      accessToken = this.userInfoAuth.accessToken;
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
  };

  refreshTokenAndRetry(request: HttpRequest<any>, next: any): Observable<any> {
    const payload = {
      address: this.userInfoAuth.address,
      refreshToken: this.userInfoAuth.refreshToken,
    };
    return this.httpService.post('api/token', payload).pipe(
      switchMap((res) => {
        // Update the access token in local storage and in the application state
        const userInfo = {
          address: this.userInfoAuth.address,
          refreshToken: this.userInfoAuth.refreshToken,
          accessToken: res.accessToken,
        };
        this.localStorageService.setItem('userInfo', JSON.stringify(userInfo));
        // update the userInfoReceived object
        this.store.dispatch(new AuthActions.GetAccessToken(res.accessToken));

        // Clone the original request with the new token and retry it
        const updatedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${userInfo.accessToken}`,
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
