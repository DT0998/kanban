import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ListComponent } from '../../shared/components/list/list.component';
import { BoardService } from '../../shared/services/board/board.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [FormsModule, CommonModule, ListComponent],
  providers: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  openList: boolean;
  constructor(private http: HttpClient, private boardService: BoardService) {
    this.openList = this.boardService.openList;
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

  handleCloseOverlayAndIcon(event: Event) {
    event.stopPropagation();
    this.boardService.handleCloseOverlayAndIcon();
  }
}
