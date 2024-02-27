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
  constructor(public dialogRef: MatDialogRef<ModalPremiumComponent>) {}
  closeModal() {
    this.dialogRef.close();
  }
}
