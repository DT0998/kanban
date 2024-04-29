import { Injectable } from '@angular/core';
import { ProfileApiService } from '../api/profile/profile-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  userInfo: UserInfo = {};
  SignIn: SignIn = {};
  constructor(private profileApiService: ProfileApiService) { }
  getProfile = async (address: string) => {
    const res = await this.profileApiService.getProfile(address);
    return res;
  };
}

export interface UserProfile {
  name: string;
  address: string;
  dateAdded: Date;
  premium: boolean;
}

export interface SignIn {
  signInCount?: number;
}

export interface UserInfo {
  accessToken?: string;
  refreshToken?: string;
  address?: string;
  name?: string;
  premium?: boolean;
}
