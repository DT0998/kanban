import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../shared/services/profile/profile.service';
import { LocalStorageService } from '../../../shared/services/localStorage/localStorage.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  userAddress!: string;
  userAccessToken!: string;
  constructor(
    public profileService: ProfileService,
    public localStorageService: LocalStorageService
  ) {
    const userInfo = this.localStorageService.getItem('userInfo') as string;
    const userInfoParse = JSON.parse(userInfo);
    if (userInfoParse) {
      this.userAddress = userInfoParse.address;
      this.userAccessToken = userInfoParse.accessToken;
    }
  }
  ngOnInit(): void {
    this.getProfile();
  }
  getProfile = () => {
    if (this.userAccessToken) {
      this.profileService.getProfile(this.userAddress);
    }
  };
}
