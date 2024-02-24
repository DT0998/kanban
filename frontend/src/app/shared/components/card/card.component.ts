import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionAddOutline, ionCloseOutline } from '@ng-icons/ionicons';
import { BoardService } from '../../services/board/board.service';
import { Card } from '../../models/card.model';
import { List } from '../../models/list.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIconComponent, FormsModule, CommonModule],
  providers: [
    provideIcons({
      ionAddOutline,
      ionCloseOutline,
    }),
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() listItem!: List;
  @Input() listIndex!: number;
  cardTitle: string;
  constructor(public boardService: BoardService) {
    this.cardTitle = '';
  }
  
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

    this.listItem.cards.push(newCard);
    this.cardTitle = '';
    console.log(this.listItem.cards);
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
}
