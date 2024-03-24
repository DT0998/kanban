import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  userInfo: UserInfo = {};
  SignIn: SignIn = {};
  constructor(public httpService: HttpService) {}
  getProfile = async (address: string) => {
    const res = await this.httpService
      .get(`api/profile/${address}`)
      .toPromise();
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
