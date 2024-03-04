import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionAddOutline, ionCloseOutline } from '@ng-icons/ionicons';
import { BoardService } from '../../services/board/board.service';
import { Card } from '../../models/card.model';
import { List } from '../../models/list.model';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import * as fromApp from '../../store/store.reducer';
import * as BoardActions from '../../store/board/board.actions';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIconComponent, FormsModule, CommonModule, DragDropModule],
  providers: [
    provideIcons({
      ionAddOutline,
      ionCloseOutline,
    }),
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() listItem!: List;
  @Input() listIndex!: number;

  cardTitle: string;
  constructor(
    public boardService: BoardService,
    public store: Store<fromApp.AppState>
  ) {
    this.cardTitle = '';
  }

  ngOnInit(): void {}

  getNextCardId(): number {
    // Find the maximum ID in the existing cards of the current list item
    const maxId = this.listItem.cards.reduce(
      (max, card) => (card.id > max ? card.id : max),
      0
    );
    // Increment the maximum ID to get the next available ID for the new card
    return maxId + 1;
  }

  addCard() {
    const newCard: Card = {
      id: this.getNextCardId(), // Generate ID for the new card
      title: this.cardTitle,
    };
    // Dispatch an action to add card inside list
    this.store.dispatch(
      new BoardActions.AddCard({ listId: this.listIndex, card: newCard })
    );
    this.cardTitle = '';
  }

  updateCard() {
    console.log('update card');
  }

  handleCloseOverlayAndIcon(event: Event) {
    event.stopPropagation();
    this.boardService.handleCloseOverlayAndIcon();
  }

  handleCard() {
    if (this.cardTitle.trim()) {
      this.addCard();
    }
  }

  handleAddCardOpen(event: Event, index: number) {
    event.stopPropagation();
    if (this.boardService.openCardIndex === index) {
      this.boardService.handleCloseCard();
    } else {
      this.boardService.handleOpenCard(index);
    }
  }

  // Drag and Drop card item
  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      // move same list
      // moveItemInArray(
      //   newCards,
      //   event.previousIndex,
      //   event.currentIndex
      // );
    } else {
      // move different list
      // transferArrayItem(
      //   event.previousContainer.data,
      //   newCards,
      //   event.previousIndex,
      //   event.currentIndex
      // );
    }
  }
}
