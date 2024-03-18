import { Injectable } from '@angular/core';
import { writeContract } from '@wagmi/core';
import { polygonMumbai } from '@wagmi/chains';
import { environment } from '../../../../environments/environments';
import { KANBANABI } from '../../abi/abi';
import { parseEther } from 'viem';
import { WagmiService } from '../wagmi/wagmi.service';

@Injectable({
  providedIn: 'root',
})
export class ModalConfirmPremiumService {
  constructor(private wagmiService: WagmiService) {}
  async confirmSubscribePremium() {
    try {
      await writeContract({
        chainId: polygonMumbai.id,
        address: environment.contractAddress,
        abi: KANBANABI,
        functionName: 'subscribeRequestPremium',
        args: [
          this.wagmiService.wagmiProvider.account,
          environment.adminAddress,
        ],
        account: this.wagmiService.wagmiProvider.account,
        value: parseEther('0.1'),
      });
    } catch (error) {
      console.error(error);
    }
  }
}
