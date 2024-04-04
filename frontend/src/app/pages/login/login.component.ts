import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WagmiService } from '../../shared/services/wagmi/wagmi.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpService } from '../../shared/services/http/http.service';
import * as fromApp from '../../shared/store/store.reducer';
import * as AuthActions from '../../shared/store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '../../shared/services/localStorage/localStorage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../shared/services/profile/profile.service';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  isLoading: boolean;
  constructor(
    public wagmiService: WagmiService,
    public httpService: HttpService,
    public localStorageService: LocalStorageService,
    public store: Store<fromApp.AppState>,
    public router: Router,
    private toastr: ToastrService,
    public profileService: ProfileService,
    public authService: AuthService
  ) {
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.setSignInCount();
  }

  setSignInCount = () => {
    if (
      this.profileService.SignIn.signInCount &&
      this.profileService.SignIn.signInCount >= 1
    ) {
      return;
    }
    this.profileService.SignIn.signInCount = 0;
    this.localStorageService.setItem(
      'signinCount',
      JSON.stringify(this.profileService.SignIn)
    );
  };

  handleLogin = async () => {
    try {
      this.isLoading = true;
      await this.wagmiService.connectWallet();
      const userAddress = this.wagmiService.wagmiProvider.accounts[0];
      const payload = {
        address: userAddress,
      };
      // Make the login request and convert the observable to a promise
      const resLogin = await this.httpService
        .post('api/login', payload)
        .toPromise();
      // Store the access token object in local storage
      if (
        this.profileService.SignIn.signInCount !== undefined &&
        this.profileService.SignIn.signInCount >= 0
      ) {
        this.profileService.SignIn.signInCount += 1;
      }
      this.profileService.userInfo.refreshToken = resLogin.refreshToken;
      this.profileService.userInfo.accessToken = resLogin.accessToken;
      this.profileService.userInfo.address = userAddress;
      this.store.dispatch(new AuthActions.GetAccessToken(resLogin.accessToken));
      this.store.dispatch(
        new AuthActions.GetRefreshToken(resLogin.refreshToken)
      );
      this.localStorageService.setItem(
        'userInfo',
        JSON.stringify(this.profileService.userInfo)
      );
      this.localStorageService.setItem(
        'signinCount',
        JSON.stringify(this.profileService.SignIn)
      );
      this.toastr.success('Login successful');
      // Navigate to the dashboard after login is successful
      this.router.navigateByUrl('/dashboard');
    } catch {
      await this.wagmiService.disconnectWallet();
    } finally {
      this.isLoading = false;
    }
  };
}
