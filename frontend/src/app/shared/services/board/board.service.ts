import { Injectable } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  openList: boolean;
  openCardIndex: string | null;
  constructor(public dashboardService: DashboardService) {
    this.openList = false;
    this.openCardIndex = null;
  }

  handleOpenList(index: number, premium: boolean) {
    this.openList = premium || index <= 4;
    // limit the number of open cards for non-premium users
    if (!premium && index > 4) {
      this.dashboardService.openPremiumModal();
    }
  }

  handleOpenCard(index: string) {
    this.openCardIndex = index;
  }

  handleCloseCard() {
    this.openCardIndex = null;
  }

  handleCloseOverlayAndIcon() {
    this.openList = false;
    this.openCardIndex = null;
  }
}
