import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  ionCalendarClearOutline,
  ionAddOutline,
  ionBagCheckOutline,
  ionReceiptOutline,
} from '@ng-icons/ionicons';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalPremiumComponent } from '../../../components/modal-premium/modal-premium.component';
import { ModalBoardComponent } from '../../../components/modal-board/modal-board.component';
import * as fromApp from '../../../store/store.reducer';
import { Store } from '@ngrx/store';
import { Board } from '../../../models/board.model';
import { selectBoardList } from '../../../store/board/board.selector';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { LocalStorageService } from '../../../services/localStorage/localStorage.service';
import { WagmiService } from '../../../services/wagmi/wagmi.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    RouterOutlet,
    RouterLink,
    RouterModule,
    ModalPremiumComponent,
    ModalBoardComponent,
  ],
  providers: [
    provideIcons({
      ionCalendarClearOutline,
      ionAddOutline,
      ionBagCheckOutline,
      ionReceiptOutline,
    }),
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit, OnDestroy {
  @ViewChild('modalBoard') modalBoard!: ElementRef;

  boardLists: Board[] = [];

  @Input() premium!: boolean | undefined;

  constructor(
    public dialog: MatDialog,
    public store: Store<fromApp.AppState>,
    public dashboardService: DashboardService,
    public localStorageService: LocalStorageService,
    public wagmiService: WagmiService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getBoardList();
  }

  getBoardList = () => {
    // get the board list from the store
    this.store.select(selectBoardList).subscribe((boardList: Board[]) => {
      this.boardLists = boardList;
    });
  };

  openPremiumModal = () => {
    this.dashboardService.openPremiumModal();
  };

  openBoardModal = () => {
    this.dashboardService.openBoardModal(
      this.modalBoard,
      this.premium,
      this.boardLists.length
    );
  };

  navigateBoardDetail = (board: Board, index: number) => {
    if (this.premium || index <= 4) {
      this.router.navigate(['/dashboard', 'board', board.background.id]);
    } else {
      this.router.navigate([
        '/dashboard',
        'board',
        this.boardLists[4].background.id,
      ]);
      this.dashboardService.openPremiumModal();
    }
  };

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
}
