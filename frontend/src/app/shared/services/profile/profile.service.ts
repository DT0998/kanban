import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { LocalStorageService } from '../localStorage/localStorage.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  userProfile!: UserProfile;
  address!: string;
  constructor(
    public httpService: HttpService,
    public localStorageService: LocalStorageService
  ) {
    const userInfo = this.localStorageService.getItem('userInfo');
    const userInfoParsed = userInfo ? JSON.parse(userInfo) : null;
    this.address = userInfoParsed?.address;
  }
  async getProfile() {
    const res = await this.httpService
      .get(`api/profile/${this.address}`)
      .toPromise();
    this.userProfile = await res;
  }
}

export interface UserProfile {
  name: string;
  address: string;
  dateAdded: Date;
  premium: boolean;
}
