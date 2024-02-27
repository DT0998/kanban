import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
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
} from '@ng-icons/ionicons';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalPremiumComponent } from '../../components/modal-premium/modal-premium.component';
import { ModalBoardComponent } from '../../components/modal-board/modal-board.component';

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
  ],
  providers: [
    provideIcons({
      ionHomeOutline,
      ionSettingsOutline,
      ionReorderThreeOutline,
      ionCalendarClearOutline,
      ionAddOutline,
      ionBagCheckOutline,
    }),
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnDestroy {
  @ViewChild('modalBoard') modalBoard!: ElementRef;
  isSidebarMobileOpen: boolean;
  isSmallScreen: boolean;
  isModalBoardOpen: boolean = false;
  constructor(public dialog: MatDialog) {
    this.isSidebarMobileOpen = false;
    this.isSmallScreen = false;
  }
  // detect window resize
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isSmallScreen = window.innerWidth <= 426;
    // change sidebar when desktop
    if (!this.isSmallScreen) {
      this.isSidebarMobileOpen = false;
    }
  }

  toggleSidebarMobile = () => {
    if (!this.isSmallScreen) {
      this.isSidebarMobileOpen = false;
    } else {
      this.isSidebarMobileOpen = !this.isSidebarMobileOpen;
    }
  };

  openPremiumModal() {
    this.dialog.open(ModalPremiumComponent, {
      width: this.isSmallScreen ? '100vw' : '450px',
      maxWidth: this.isSmallScreen ? '100vw' : '450px',
      height: this.isSmallScreen ? '100%' : 'auto',
    });
    this.isSidebarMobileOpen = false;
  }

  openBoardModal() {
    if (this.isModalBoardOpen) {
      // If the modal is open, close it
      this.dialog.closeAll(); // Close any open dialog (assuming you're using Angular Material Dialog)
    } else {
      // If the modal is closed, open it
      const positionData = {
        top: this.modalBoard.nativeElement.getBoundingClientRect().top,
        right: this.modalBoard.nativeElement.getBoundingClientRect().right,
      };
      const dialogRef = this.dialog.open(ModalBoardComponent, {
        width: this.isSmallScreen ? '100vw' : '340px',
        maxWidth: this.isSmallScreen ? '100vw' : '340px',
        height: this.isSmallScreen ? '100%' : 'auto',
        hasBackdrop: false,
        data: positionData,
      });
      // Subscribe to the afterClosed observable to update the flag when the dialog is closed
      dialogRef.afterClosed().subscribe(() => {
        this.isModalBoardOpen = false;
      });
      // Toggle the flag
      this.isModalBoardOpen = !this.isModalBoardOpen;
      // Optionally, close the sidebar if needed
      this.isSidebarMobileOpen = false;
    }
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
}
