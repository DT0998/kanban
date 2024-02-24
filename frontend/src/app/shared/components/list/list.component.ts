import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionAddOutline, ionCloseOutline } from '@ng-icons/ionicons';
import { List } from '../../models/list.model';
import { BoardService } from '../../services/board/board.service';
import { HttpClient } from '@angular/common/http';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgIconComponent, FormsModule, CommonModule, CardComponent],
  providers: [
    provideIcons({
      ionAddOutline,
      ionCloseOutline,
    }),
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  public listTitle: string;
  public isFirstListInit = true;
  public list: List[] = [];

  public openCard = false;
  constructor(public boardService: BoardService, private http: HttpClient) {
    this.listTitle = '';
  }

  getNextId(): number {
    // Find the maximum ID in the existing list
    const maxId = this.list.reduce(
      (max, list) => (list.id > max ? list.id : max),
      0
    );
    // Increment the maximum ID to get the next available ID
    return maxId + 1;
  }

  getList() {}
  addList() {
    const newList: List = {
      id: this.getNextId(),
      title: this.listTitle,
      cards: [],
    };
    this.list.push(newList);
    this.listTitle = '';
    this.boardService.handleCloseOverlayAndIcon();
    if (this.list.length > 0) {
      this.isFirstListInit = false;
    }
  }

  updateList() {
    console.log('update List');
  }

  handleList() {
    if (this.listTitle.trim()) {
      this.addList();
    }
  }

  handleAddListOpen(event: Event, index?: number) {
    event.stopPropagation();
    if (index === undefined) {
      this.boardService.handleOpenList();
    }
  }

 

  handleCloseOverlayAndIcon(event: Event) {
    event.stopPropagation();
    this.boardService.handleCloseOverlayAndIcon();
  }
}
