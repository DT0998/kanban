import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionCloseOutline } from '@ng-icons/ionicons';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { writeContract, getContract } from '@wagmi/core';
import { polygonMumbai } from '@wagmi/chains';
import { environment } from '../../../../environments/environments';
import { KANBANABI } from '../../abi/abi';
import { parseEther } from 'viem';
import { WagmiService } from '../../services/wagmi/wagmi.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { prepareTransactionRequest } from 'viem/actions';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgIconComponent,
    FormsModule,
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatProgressSpinnerModule,
  ],
  providers: [
    provideIcons({
      ionCloseOutline,
    }),
  ],
  templateUrl: './modal-premium.component.html',
  styleUrl: './modal-premium.component.scss',
})
export class ModalPremiumComponent {
  isLoading: boolean;
  constructor(
    public dialogRef: MatDialogRef<ModalPremiumComponent>,
    public wagmiService: WagmiService
  ) {
    this.isLoading = false;
    console.log(polygonMumbai.id)
    console.log(this.wagmiService.wagmiProvider)
  }
  closeModal() {
    this.dialogRef.close();
  }
  async handleSubscribePremium() {
    try {
      this.isLoading = true;
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
    } finally {
      this.isLoading = false;
    }
  }
}
