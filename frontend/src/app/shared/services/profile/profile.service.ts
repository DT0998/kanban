import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  userInfo: UserInfo = {};
  constructor(public httpService: HttpService) {}
  async getProfile(address: string) {
    const res = await this.httpService
      .get(`api/profile/${address}`)
      .pipe(delay(2000))
      .toPromise();
    return res;
  }
}

export interface UserProfile {
  name: string;
  address: string;
  dateAdded: Date;
  premium: boolean;
}

export interface UserInfo {
  accessToken?: string;
  refreshToken?: string;
  address?: string;
  name?: string;
  premium?: boolean;
}
