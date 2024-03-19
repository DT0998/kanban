import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../shared/services/profile/profile.service';
import { HttpService } from '../../../shared/services/http/http.service';
import { LocalStorageService } from '../../../shared/services/localStorage/localStorage.service';
import { WagmiService } from '../../../shared/services/wagmi/wagmi.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../shared/store/store.reducer';
import * as PremiumActions from '../../../shared/store/premium/premium.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  userAddress!: string;
  userInfo!: string;

  constructor(
    public httpService: HttpService,
    public profileService: ProfileService,
    public localStorageService: LocalStorageService,
    public wagmiService: WagmiService,
    public store: Store<fromApp.AppState>,
  ) {
    this.userInfo = this.localStorageService.getItem('userInfo') as string;
    const userInfoParse = JSON.parse(this.userInfo);
    this.userAddress = userInfoParse.address;
  }

  ngOnInit() {
    this.getProfile();
  }

  async getProfile() {
    await this.wagmiService.connectWallet();
    const res = await this.profileService.getProfile(this.userAddress);
    // update the user info in the local storage
    this.profileService.userInfo.name = res.data.name;
    this.profileService.userInfo.premium = res.data.premium;
    const userInfoParse = JSON.parse(this.userInfo);
    userInfoParse.name = res.data.name;
    userInfoParse.premium = res.data.premium;
    this.store.dispatch(
      new PremiumActions.GetPremium(res.data.premium)
    );
    this.localStorageService.setItem('userInfo', JSON.stringify(userInfoParse));
  }
}
