import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  ionHomeOutline,
  ionSettingsOutline,
  ionReorderThreeOutline,
  ionCalendarClearOutline,
  ionAddOutline,
  ionBagCheckOutline,
  ionPersonCircleOutline,
  ionReceiptOutline,
} from '@ng-icons/ionicons';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalPremiumComponent } from '../../components/modal-premium/modal-premium.component';
import { ModalBoardComponent } from '../../components/modal-board/modal-board.component';
import * as fromApp from '../../store/store.reducer';
import { Store } from '@ngrx/store';
import { Board } from '../../models/board.model';
import { selectBoardList } from '../../store/board/board.selector';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { selectPremium } from '../../store/premium/premium.selector';
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    RouterOutlet,
    RouterLink,
    RouterModule,
    ModalPremiumComponent,
    ModalBoardComponent,
    MatMenuModule,
    MatButtonModule
  ],
  providers: [
    provideIcons({
      ionHomeOutline,
      ionSettingsOutline,
      ionReorderThreeOutline,
      ionCalendarClearOutline,
      ionAddOutline,
      ionBagCheckOutline,
      ionPersonCircleOutline,
      ionReceiptOutline,
    }),
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('modalBoard') modalBoard!: ElementRef;

  boardLists: Board[] = [];

  premium!: boolean;

  constructor(
    public dialog: MatDialog,
    public store: Store<fromApp.AppState>,
    public dashboardService: DashboardService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getBoardList();
    this.getPremium();
  }

  getBoardList() {
    // get the board list from the store
    this.store.select(selectBoardList).subscribe((boardList: Board[]) => {
      this.boardLists = boardList;
    });
  }

  getPremium() {
    // get the premium from the store
    this.store.select(selectPremium).subscribe((premium: boolean) => {
      this.premium = premium;
    });
  }

  // detect window resize
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.dashboardService.onResize(event);
  }

  toggleSidebarMobile = () => {
    this.dashboardService.toggleSidebarMobile();
  };

  openPremiumModal() {
    this.dashboardService.openPremiumModal();
  }

  openBoardModal() {
    this.dashboardService.openBoardModal(
      this.modalBoard,
      this.premium,
      this.boardLists.length
    );
  }

  navigateBoardDetail(board: Board, index: number) {
    if (this.premium || index <= 4) {
      this.router.navigate(['/dashboard', 'board', board.background.id]);
    } else {
      this.router.navigate(['/dashboard', 'board', this.boardLists[4].background.id]);
      this.dashboardService.openPremiumModal();
    }
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
}
