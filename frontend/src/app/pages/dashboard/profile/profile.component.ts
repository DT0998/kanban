import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../../shared/services/http/http.service';
import { ProfileService } from '../../../shared/services/profile/profile.service';
import { WagmiService } from '../../../shared/services/wagmi/wagmi.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  userAddress!: string;
  constructor(
    public httpService: HttpService,
    public profileService: ProfileService,
    public wagmiService: WagmiService
  ) {
    this.userAddress = this.wagmiService.wagmiProvider?.account;
  }
  ngOnInit(): void {
    this.getProfile();
  }
  getProfile() {
    this.profileService.getProfile(this.userAddress);
  }
}
