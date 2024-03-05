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
import { selectPremium } from '../../store/premium/premium.selector';
import { selectBoardList } from '../../store/board/board.selector';
import { Board } from '../../models/board.model';
import { v4 as uuidv4 } from 'uuid';

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
  @Input() boardId!: string | undefined;
  public listTitle: string;
  public isFirstListInit = true;
  public lists: List[] = [];
  public openCard = false;
  premium!: boolean;
  listsId!: number;

  constructor(
    public boardService: BoardService,
    private http: HttpClient,
    public store: Store<fromApp.AppState>
  ) {
    this.listTitle = '';
  }

  ngOnInit(): void {
    this.getList();
    this.getPremium();
  }

  // This lifecycle hook is called when any data-bound property of the component changes
  ngOnChanges(changes: SimpleChanges): void {
    // detect change input boardId
    if (changes['boardId'] && !changes['boardId'].firstChange) {
      this.getList();
    }
  }

  getPremium() {
    // get the premium from the store
    this.store.select(selectPremium).subscribe((premium: boolean) => {
      this.premium = premium;
    });
  }

  getList() {
    this.store.select(selectBoardList).subscribe((boardLists: Board[]) => {
      // find the board by id
      const board = boardLists.find(
        (board) => board.background.id === String(this.boardId)
      );
      this.lists = board ? board.lists : [];
    });
  }

  addList() {
    const newList: List = {
      id: uuidv4(),
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

  handleAddListOpen(event: Event) {
    console.log(this.lists);
    event.stopPropagation();
    if (this.lists.length >= 0) {
      this.boardService.handleOpenList(this.lists.length, this.premium);
    }
  }

  handleCloseOverlayAndIcon(event: Event) {
    event.stopPropagation();
    this.boardService.handleCloseOverlayAndIcon();
  }

  ngOnDestroy(): void {}
}
