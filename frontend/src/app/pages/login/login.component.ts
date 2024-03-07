import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WagmiService } from '../../shared/services/wagmi/wagmi.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(public wagmiService: WagmiService) {}

  handleLogin() {
    this.wagmiService.connectWallet();
  }
}
