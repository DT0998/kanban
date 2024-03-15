import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../shared/services/profile/profile.service';
import { HttpService } from '../../../shared/services/http/http.service';
import { LocalStorageService } from '../../../shared/services/localStorage/localStorage.service';

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
    public localStorageService: LocalStorageService
  ) {
    const userInfo = this.localStorageService.getItem('userInfo') as string;
    const userInfoParse = JSON.parse(userInfo);
    this.userAddress = userInfoParse.address;
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.profileService.getProfile(this.userAddress);
  }
}
