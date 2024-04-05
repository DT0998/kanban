import { ElementRef, HostListener, Injectable, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalPremiumComponent } from '../../components/modal-premium/modal-premium.component';
import { ModalBoardComponent } from '../../components/modal-board/modal-board.component';
import { ModalConfirmPremiumComponent } from '../../components/modal-confirm-premium/modal-confirm-premium.component';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  isSidebarMobileOpen: boolean;
  isSmallScreen: boolean;
  isLaptopSmallScreen: boolean;
  private isModalBoardOpen: boolean;

  constructor(public dialog: MatDialog) {
    this.isSidebarMobileOpen = false;
    this.isSmallScreen = false;
    this.isModalBoardOpen = false;
    this.isLaptopSmallScreen = false;
  }

  updateScreenSize() {
    this.isSmallScreen = window.innerWidth <= 426;
    this.isLaptopSmallScreen = window.innerWidth <= 1025;
  }

  // detect window resize
  onResize = (event: Event): void => {
    // change sidebar when desktop
    if (!this.isSmallScreen) {
      this.isSidebarMobileOpen = false;
    }
  };

  toggleSidebarMobile = () => {
    if (!this.isSmallScreen) {
      this.isSidebarMobileOpen = false;
    } else {
      this.isSidebarMobileOpen = !this.isSidebarMobileOpen;
    }
  };

  openPremiumModal = () => {
    this.dialog.open(ModalPremiumComponent, {
      width: this.isSmallScreen ? '100vw' : '450px',
      maxWidth: this.isSmallScreen ? '100vw' : '450px',
      height: this.isSmallScreen ? '100%' : 'auto',
    });
    this.isSidebarMobileOpen = false;
  };

  openConfirmPremiumModal = () => {
    this.isSidebarMobileOpen = false;
    return this.dialog.open(ModalConfirmPremiumComponent, {
      width: this.isSmallScreen ? '100vw' : '450px',
      maxWidth: this.isSmallScreen ? '100vw' : '450px',
      height: this.isSmallScreen ? '100%' : 'auto',
      panelClass: 'confirm-premium-modal',
    });
  };

  openBoardModal = (
    modalBoardRef: ElementRef,
    premium: boolean | undefined,
    index: number
  ) => {
    if (premium || index <= 4) {
      if (this.isModalBoardOpen) {
        // If the modal is open, close it
        this.dialog.closeAll();
      } else {
        // If the modal is closed, open it
        const positionData = {
          top: modalBoardRef.nativeElement.getBoundingClientRect().top,
          right: modalBoardRef.nativeElement.getBoundingClientRect().right,
        };
        const dialogRef = this.dialog.open(ModalBoardComponent, {
          width: this.isSmallScreen ? '100vw' : '304px',
          maxWidth: this.isSmallScreen ? '100vw' : '304px',
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
    } else {
      // Show a message or perform an action to indicate that the user cannot open the modal because they are not a premium user and the index is greater than or equal to 4
      this.openPremiumModal();
    }
  };
}
