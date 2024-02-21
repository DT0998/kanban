import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionAddOutline, ionCloseOutline } from '@ng-icons/ionicons';
import { FormsModule } from '@angular/forms';
import { Card, List } from '../../shared/models/board';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [NgIconComponent, FormsModule, CommonModule],
  providers: [
    provideIcons({
      ionAddOutline,
      ionCloseOutline,
    }),
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  public listTitle: string;
  public cardTitle: string;
  public list: List[] = [];
  public openList = false;
  public isFirstListInit = true;
  public openCard = false;

  constructor(private http: HttpClient) {
    this.cardTitle = '';
    this.listTitle = '';
  }

  ngOnInit(): void {
    this.testHttp();
  }

  testHttp() {
    this.http
      .get('https://api.themoviedb.org/3/trending/movie/week?&page=1')
      .subscribe((data) => {
        console.log(data);
      });
  }

  handleAddList() {
    if (this.listTitle.trim()) {
      const newList: List = { title: this.listTitle, cards: [] };
      this.list.push(newList);
      this.listTitle = '';
      this.openList = false;
      if (this.list.length > 0) {
        this.isFirstListInit = false;
      }
    } else {
      // Handle the case when the title is empty
    }
  }

  handleAddCard(listIndex: number) {
    if (this.cardTitle.trim()) {
      const newCard: Card = { title: this.cardTitle };
      this.list[listIndex].cards.push(newCard);
      this.cardTitle = '';
    } else {
      // Handle the case when the card title is empty
    }
  }

  handleAddListOpen(event: Event, index?: number) {
    event.stopPropagation();
    if (index === undefined) {
      this.openList = true;
    }
  }

  handleAddCardOpen(event: Event, index: number) {
    event.stopPropagation();
    if (index === undefined) {
      this.openCard = true;
    }
  }

  handleListAndCardClose(event: Event) {
    event.stopPropagation();
    this.openList = false;
  }
}
