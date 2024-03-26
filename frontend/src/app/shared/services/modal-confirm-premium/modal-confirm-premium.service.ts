import { Injectable } from '@angular/core';
import { writeContract } from '@wagmi/core';
import { polygonMumbai } from '@wagmi/chains';
import { environment } from '../../../../environments/environments';
import { KANBANABI } from '../../abi/abi';
import { parseEther } from 'viem';
import { WagmiService } from '../wagmi/wagmi.service';
import { HttpService } from '../http/http.service';
import { LocalStorageService } from '../localStorage/localStorage.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../profile/profile.service';
import * as fromApp from '../../../shared/store/store.reducer';
import * as PremiumActions from '../../../shared/store/premium/premium.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class ModalConfirmPremiumService {
  userName!: string;
  userAddress!: string;
  userInfo!: string;
  constructor(
    private wagmiService: WagmiService,
    private httpService: HttpService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private profileService: ProfileService,
    public store: Store<fromApp.AppState>
  ) {
    this.userInfo = this.localStorageService.getItem('userInfo') as string;
    const userInfoParse = JSON.parse(this.userInfo);
    this.userName = userInfoParse.name;
  }

  confirmSubscribePremium = async () => {
    try {
      await writeContract({
        chainId: polygonMumbai.id,
        address: `0x${environment.contractAddress}`,
        abi: KANBANABI,
        functionName: 'subscribeRequestPremium',
        args: [
          this.wagmiService.wagmiProvider.account,
          environment.adminAddress,
        ],
        account: this.wagmiService.wagmiProvider.account,
        value: parseEther('0.1'),
      });
      const resSubscribe = await this.httpService
        .post('api/subscribe-premium', {
          address: this.wagmiService.wagmiProvider.account,
          name: this.userName,
        })
        .toPromise();
      this.profileService.userInfo.premium = resSubscribe.premium;
      const userInfoParse = JSON.parse(this.userInfo);
      userInfoParse.premium = resSubscribe.premium;
      this.store.dispatch(new PremiumActions.GetPremium(resSubscribe.premium));
      this.localStorageService.setItem(
        'userInfo',
        JSON.stringify(userInfoParse)
      );
      this.toastr.success('Subscription successful');
    } catch (error) {
      this.toastr.error('Subscription unsuccessful');
      console.error(error);
    }
  };
}
