import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  userProfile!: UserProfile;
  constructor(public httpService: HttpService) {}
  async getProfile(address: string) {
    const res = await this.httpService
      .get(`api/profile/${address}`)
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
