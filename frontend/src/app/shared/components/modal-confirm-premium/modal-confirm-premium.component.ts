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
import { WagmiService } from '../../services/wagmi/wagmi.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ModalConfirmPremiumService } from '../../services/modal-confirm-premium/modal-confirm-premium.service';

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
  templateUrl: './modal-confirm-premium.component.html',
  styleUrl: './modal-confirm-premium.component.scss',
})
export class ModalConfirmPremiumComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalConfirmPremiumComponent>,
    public wagmiService: WagmiService,
    private modalConfirmPremiumService: ModalConfirmPremiumService
  ) {}

  closeModal = () => {
    this.dialogRef.close();
  }

  confirmSubscribePremium = async () => {
    try {
      await this.modalConfirmPremiumService.confirmSubscribePremium();
    } catch (error) {
      console.error(error);
    } finally {
      this.dialogRef.close();
    }
  }
}
