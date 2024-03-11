import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WagmiService } from '../../shared/services/wagmi/wagmi.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoading: boolean;
  constructor(public wagmiService: WagmiService) {
    this.isLoading = false;
  }

  async handleLogin() {
    try {
      this.isLoading = true;
      await this.wagmiService.connectWallet();
    } catch {
      await this.wagmiService.disconnectWallet();
    } finally {
      this.isLoading = false;
    }
  }
}
