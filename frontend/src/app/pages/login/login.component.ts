import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WagmiService } from '../../shared/services/wagmi/wagmi.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpService } from '../../shared/services/http/http.service';
import { getAccount } from '@wagmi/core';
import * as fromApp from '../../shared/store/store.reducer';
import * as AuthActions from '../../shared/store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '../../shared/services/localStorage/localStorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoading: boolean;
  constructor(
    public wagmiService: WagmiService,
    public httpService: HttpService,
    public localStorageService: LocalStorageService,
    public store: Store<fromApp.AppState>,
    public router: Router
  ) {
    this.isLoading = false;
  }

  async handleLogin() {
    try {
      this.isLoading = true;
      await this.wagmiService.connectWallet();
      const account = getAccount();
      const payload = {
        address: account.address,
      };
      // Make the login request and convert the observable to a promise
      const res = await this.httpService.post('api/login', payload).toPromise();

      // Store the access token object in local storage
      const obj = {
        accessToken: res.accessToken,
        address: account.address,
      };
      this.localStorageService.setItem('userInfo', JSON.stringify(obj));
      this.store.dispatch(new AuthActions.GetAccessToken(res.accessToken));
      this.store.dispatch(new AuthActions.GetRefreshToken(res.refreshToken));

      // Navigate to the dashboard after login is successful
      this.router.navigateByUrl('/dashboard');
    } catch {
      await this.wagmiService.disconnectWallet();
    } finally {
      this.isLoading = false;
    }
  }
}
