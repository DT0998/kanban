import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionCloseOutline, ionCheckmark } from '@ng-icons/ionicons';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  ListBackground,
  modalBackgroundColors,
  modalBackgroundPhotos,
} from '../../constants/modal-board.contanst';
import * as fromApp from '../../store/store.reducer';
import * as BoardActions from '../../store/board/board.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgIconComponent,
    FormsModule,
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
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
  modalBackgroundColors: ListBackground[];
  modalBackgroundPhotos: ListBackground[];
  // selected background
  selectedBackground: ListBackground | null = null;
  boardForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ModalBoardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public store: Store<fromApp.AppState>,
    private router: Router
  ) {
    this.modalBackgroundColors = modalBackgroundColors;
    this.modalBackgroundPhotos = modalBackgroundPhotos;
    // init create board form
    this.boardForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  ngOnInit(): void {
    this.updatePositionModal();
    // default selected background
    this.selectedBackground = this.modalBackgroundPhotos[0];
  }

  updatePositionModal() {
    // Update position of the modal
    this.positionData = this.data;
    this.dialogRef.updatePosition({
      top: `${this.positionData.top - 180}px`,
      left: `${this.positionData.right}px`,
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  // Select background
  selectBackground(background: ListBackground) {
    if (this.isSelected(background)) {
      // If already selected, deselect it
      this.selectedBackground = null;
    } else {
      // If not selected, select it and clear any previous selection
      this.selectedBackground = background;
    }
  }

  // Check if background is selected
  isSelected(background: ListBackground): boolean {
    return this.selectedBackground === background;
  }

  handleCreateBoard() {
    if (this.boardForm.valid && this.selectedBackground) {
      const title = this.boardForm.get('title')?.value;
      // Create a deep copy of the selectedBackground object
      const background = JSON.parse(JSON.stringify(this.selectedBackground));
      // Assign the generated UUID to the id property
      background.id = uuidv4();

      // Dispatch an action to add the board
      this.store.dispatch(
        new BoardActions.AddBoard({
          title,
          background,
          lists: [],
        })
      );
    } else {
      this.router.navigate(['/dashboard']);
    }
    // close the modal dialog after finish
    this.dialogRef.close();
  }
}
