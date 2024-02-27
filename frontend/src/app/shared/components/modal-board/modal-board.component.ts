import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionCloseOutline, ionCheckmark } from '@ng-icons/ionicons';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA,
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
      ionCheckmark,
    }),
  ],
  templateUrl: './modal-board.component.html',
  styleUrl: './modal-board.component.scss',
})
export class ModalBoardComponent implements OnInit {
  positionData: any;
  constructor(
    public dialogRef: MatDialogRef<ModalBoardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.positionData = this.data;
    this.dialogRef.updatePosition({
      top: `${this.positionData.top - 50}px`,
      left: `${this.positionData.right}px`,
    });
  }
  closeModal() {
    this.dialogRef.close();
  }
}
