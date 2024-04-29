import { Injectable } from '@angular/core';
import { writeContract } from '@wagmi/core';
import { polygonMumbai } from '@wagmi/chains';
import { environment } from '../../../../environments/environments';
import { KANBANABI } from '../../abi/abi';
import { parseEther } from 'viem';
import { WagmiService, config } from '../wagmi/wagmi.service';
import { LocalStorageService } from '../localStorage/localStorage.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../profile/profile.service';
import * as fromApp from '../../../shared/store/store.reducer';
import * as PremiumActions from '../../../shared/store/premium/premium.actions';
import { Store } from '@ngrx/store';
import { PremiumApiService } from '../api/premium/premium-api.service';

@Injectable({
  providedIn: 'root',
})
export class ModalConfirmPremiumService {
  userName!: string;
  userAddress!: string;
  userInfo!: string;
  constructor(
    private wagmiService: WagmiService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private profileService: ProfileService,
    public store: Store<fromApp.AppState>,
    public premiumApiService: PremiumApiService,
  ) {
    this.userInfo = this.localStorageService.getItem('userInfo') as string;
    const userInfoParse = JSON.parse(this.userInfo);
    if (userInfoParse) {
      this.userName = userInfoParse.name;
    }
  }

  confirmSubscribePremium = async () => {
    try {
      await writeContract(config, {
        chainId: polygonMumbai.id,
        address: `0x${environment.contractAddress}`,
        abi: KANBANABI,
        functionName: 'subscribeRequestPremium',
        args: [
          this.wagmiService.wagmiProvider?.accounts[0],
          environment.adminAddress,
        ],
        account: this.wagmiService.wagmiProvider?.accounts[0],
        value: parseEther('0.1'),
      });
      const resSubPre = await this.premiumApiService.postSubPremium(this.wagmiService.wagmiProvider?.accounts[0], this.userName);
      this.profileService.userInfo.premium = resSubPre.premium;
      const userInfoParse = JSON.parse(this.userInfo);
      userInfoParse.premium = resSubPre.premium;
      this.store.dispatch(new PremiumActions.GetPremium(resSubPre.premium));
      this.localStorageService.setItem(
        'userInfo',
        JSON.stringify(userInfoParse)
      );
      this.toastr.success('Subscription successful');
      window.location.reload();
    } catch (error) {
      this.toastr.error('Subscription unsuccessful');
    }
  };
}
