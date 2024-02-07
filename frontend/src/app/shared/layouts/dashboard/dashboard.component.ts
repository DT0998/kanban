import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  ionHomeOutline,
  ionSettingsOutline,
  ionReorderThreeOutline,
  ionCalendarClearOutline,
  ionAddOutline,
} from '@ng-icons/ionicons';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    RouterOutlet,
    RouterLink,
    RouterModule,
  ],
  providers: [
    provideIcons({
      ionHomeOutline,
      ionSettingsOutline,
      ionReorderThreeOutline,
      ionCalendarClearOutline,
      ionAddOutline
    }),
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  isSidebarMobileOpen: boolean;
  isSmallScreen: boolean;
  constructor() {
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
}
