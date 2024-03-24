import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpRequest } from '@angular/common/http';
import { LocalStorageService } from '../localStorage/localStorage.service';
import * as AuthActions from '../../../shared/store/auth/auth.actions';
import * as fromApp from '../../../shared/store/store.reducer';
import { Store } from '@ngrx/store';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../profile/profile.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInfoAuth: string = '';
  userInfo: string = '';
  userInfoParse: any;
  constructor(
    public httpService: HttpService,
    public localStorageService: LocalStorageService,
    public store: Store<fromApp.AppState>,
    private toastr: ToastrService,
    private profileService: ProfileService
  ) {
    this.userInfo = this.localStorageService.getItem('userInfo') as string;
    const signinCount = this.localStorageService.getItem(
      'signinCount'
    ) as string;
    const signinCountParse = JSON.parse(signinCount);
    this.userInfoParse = JSON.parse(this.userInfo);
    if (this.userInfoParse) {
      this.userInfoAuth = this.userInfoParse;
    }
    // If the user has signed in before, increment the signin count and clear the user info
    if (signinCountParse) {
      if (signinCountParse.signInCount >= 1 && !this.userInfoParse) {
        this.toastr.error('Please refresh the page and try again');
      }
    }
  }

  addAuthorizationHeader = (request: HttpRequest<any>): HttpRequest<any> => {
    // Get the access token from the AuthService
    let accessToken;
    accessToken = this.userInfoParse
      ? this.userInfoParse.accessToken
      : this.profileService.userInfo.accessToken;
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
      address: this.userInfoParse.address,
      refreshToken: this.userInfoParse.refreshToken,
    };
    return this.httpService.post('api/token', payload).pipe(
      switchMap((res) => {
        // Update the access token in local storage and in the application state
        const userInfo = {
          address: this.userInfoParse.address,
          refreshToken: this.userInfoParse.refreshToken,
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
