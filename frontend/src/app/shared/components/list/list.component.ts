import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionAddOutline, ionCloseOutline } from '@ng-icons/ionicons';
import { List } from '../../models/list.model';
import { BoardService } from '../../services/board/board.service';
import { HttpClient } from '@angular/common/http';
import { CardComponent } from '../card/card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import * as fromApp from '../../store/store.reducer';
import * as BoardActions from '../../store/board/board.actions';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    NgIconComponent,
    FormsModule,
    CommonModule,
    CardComponent,
    DragDropModule,
  ],
  providers: [
    provideIcons({
      ionAddOutline,
      ionCloseOutline,
    }),
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() boardId!: number | undefined;
  public listTitle: string;
  public isFirstListInit = true;
  public lists: List[] = [];
  public openCard = false;
  subscription!: Subscription;

  constructor(
    public boardService: BoardService,
    private http: HttpClient,
    public store: Store<fromApp.AppState>
  ) {
    this.listTitle = '';
  }

  ngOnInit(): void {
    this.getList();
  }

  // This lifecycle hook is called when any data-bound property of the component changes
  ngOnChanges(changes: SimpleChanges): void {
    // detect change input boardId
    if (changes['boardId'] && !changes['boardId'].firstChange) {
      this.getList();
    }
  }

  getNextId(): number {
    // Find the maximum ID in the existing list
    const maxId = this.lists.reduce(
      (max, list) => (list.id > max ? list.id : max),
      0
    );
    // Increment the maximum ID to get the next available ID
    return maxId + 1;
  }

  getList() {
    // get the board list from the store
    this.subscription = this.store
      .select('board')
      .pipe(map((boardState) => boardState?.boardList))
      .subscribe((boardLists) => {
        // find the board by id
        const board = boardLists.find(
          (board) => board.background.id === this.boardId
        );
        this.lists = board ? board.lists : [];
      });
  }

  addList() {
    const newList: List = {
      id: this.getNextId(),
      title: this.listTitle,
      cards: [],
    };
    // Dispatch an action to add list inside board
    this.store.dispatch(
      new BoardActions.AddList({ list: newList, boardId: this.boardId })
    );
    this.listTitle = '';
    this.boardService.handleCloseOverlayAndIcon();
    if (this.lists.length > 0) {
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
