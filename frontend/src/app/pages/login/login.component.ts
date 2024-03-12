import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  WagmiService,
  publicClientViem,
} from '../../shared/services/wagmi/wagmi.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpService } from '../../shared/services/http/http.service';
import { lastValueFrom } from 'rxjs';
import { getAccount, Address } from '@wagmi/core';

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
    public httpService: HttpService
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
      // await this use rxjs
      const login$ = this.httpService.post('api/Login', payload);
      await lastValueFrom(login$);
    } catch {
      await this.wagmiService.disconnectWallet();
    } finally {
      this.isLoading = false;
    }
  }
}
