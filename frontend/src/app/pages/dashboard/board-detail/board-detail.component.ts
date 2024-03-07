import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ListComponent } from '../../../shared/components/list/list.component';
import { BoardService } from '../../../shared/services/board/board.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Board } from '../../../shared/models/board.model';
import * as fromApp from '../../../shared/store/store.reducer';
import { Store } from '@ngrx/store';
import { selectBoardList } from '../../../shared/store/board/board.selector';

@Component({
  selector: 'app-board-detail',
  standalone: true,
  imports: [FormsModule, CommonModule, ListComponent],
  providers: [],
  templateUrl: './board-detail.component.html',
  styleUrl: './board-detail.component.scss',
})
export class BoardDetailComponent implements OnInit {
  openList: boolean;
  boardId!: string;
  subscription!: Subscription;
  boardLists: Board[] = [];
  board!: Board | undefined;
  constructor(
    private http: HttpClient,
    private boardService: BoardService,
    private route: ActivatedRoute,
    public store: Store<fromApp.AppState>
  ) {
    this.openList = this.boardService.openList;
  }

  ngOnInit(): void {
    this.getBoardDetail();
  }

  getBoardDetail() {
    // get the board list from the store
    this.store.select(selectBoardList).subscribe((boardLists: Board[]) => {
      // find the board by id
      this.route.params.subscribe((params) => {
        this.boardId = params['id'];
        this.boardLists = boardLists;
        this.board = this.boardLists.find(
          (board) => board.background.id === this.boardId
        );
      });
    });
  }

  handleCloseOverlayAndIcon(event: Event) {
    event.stopPropagation();
    this.boardService.handleCloseOverlayAndIcon();
  }
}
