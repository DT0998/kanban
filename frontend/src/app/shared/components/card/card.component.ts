import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionAddOutline, ionCloseOutline } from '@ng-icons/ionicons';
import { BoardService } from '../../services/board/board.service';
import { Card } from '../../models/card.model';
import { List } from '../../models/list.model';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import * as fromApp from '../../store/store.reducer';
import * as BoardActions from '../../store/board/board.actions';
import { v4 as uuidv4 } from 'uuid';
import { Store } from '@ngrx/store';

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
  @Input() listId!: string;
  @Input() listIndex!: number;
  @Input() premium!: boolean;
  cardTitle: string;
  constructor(
    public boardService: BoardService,
    public store: Store<fromApp.AppState>
  ) {
    this.cardTitle = '';
  }

  ngOnInit(): void {}

  addCard = () => {
    const newCard: Card = {
      id: uuidv4(), // Generate ID for the new card
      title: this.cardTitle,
    };
    // Dispatch an action to add card inside list
    this.store.dispatch(
      new BoardActions.AddCard({ listId: this.listId, card: newCard })
    );
    this.cardTitle = '';
  };

  updateCard = () => {
  };

  handleCloseOverlayAndIcon = (event: Event) => {
    event.stopPropagation();
    this.boardService.handleCloseOverlayAndIcon();
  };

  handleCard = () => {
    if (this.cardTitle.trim()) {
      this.addCard();
    }
  };

  handleAddCardOpen = (event: Event, listId: string) => {
    event.stopPropagation();
    if (this.boardService.openCardIndex === listId) {
      this.boardService.handleCloseCard();
    } else {
      this.boardService.handleOpenCard(listId, this.listIndex, this.premium);
    }
  };

  // Drag and Drop card item
  drop = (event: CdkDragDrop<Card[]>) => {
    const newEvent = { ...event };
    const {
      currentIndex: currentIndexCard,
      previousIndex: previousIndexCard,
      container,
      previousContainer,
    } = newEvent;
    const { data: currentCards, id: currentListId } = container;
    const { data: previousCards, id: previousListId } = previousContainer;
    if (newEvent.previousContainer === newEvent.container) {
      // move same list
      this.store.dispatch(
        new BoardActions.UpdatePositionCard({
          previousCards,
          currentCards,
          currentIndexCard,
          previousIndexCard,
          currentListId,
          previousListId,
        })
      );
    } else {
      // move different list
      this.store.dispatch(
        new BoardActions.UpdatePositionCard({
          previousCards,
          currentCards,
          currentIndexCard,
          previousIndexCard,
          currentListId,
          previousListId,
        })
      );
    }
  };
}
