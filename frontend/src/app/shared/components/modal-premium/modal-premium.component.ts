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
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { ModalConfirmPremiumComponent } from '../modal-confirm-premium/modal-confirm-premium.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgIconComponent,
    FormsModule,
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
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
  constructor(
    public dialogRef: MatDialogRef<ModalPremiumComponent>,
    public confirmDialogRef: MatDialogRef<ModalConfirmPremiumComponent>,
    private dashboardService: DashboardService
  ) { }
  
  closeModal = () => {
    this.dialogRef.close();
  };

  handleSubscribePremium = async () => {
    try {
      this.confirmDialogRef = this.dashboardService.openConfirmPremiumModal();
    } catch (error) {
      console.error(error);
    } finally {
      this.dialogRef.close();
    }
  };
}
