import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WagmiService } from '../../../shared/services/wagmi/wagmi.service';
import { ProfileService } from '../../../shared/services/profile/profile.service';
import { HttpService } from '../../../shared/services/http/http.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  userAddress!: string;

  constructor(
    public httpService: HttpService,
    public profileService: ProfileService,
    public wagmiService: WagmiService
  ) {
    this.userAddress = this.wagmiService.wagmiProvider?.account;
  }
  ngOnInit() {
    this.getProfile();
  }
  getProfile() {
    this.profileService.getProfile(this.userAddress);
  }
}
