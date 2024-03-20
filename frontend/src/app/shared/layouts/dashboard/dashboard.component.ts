import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { LocalStorageService } from '../../services/localStorage/localStorage.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './nav/nav.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterModule,
    SidebarComponent,
    NavbarComponent,
  ],
  providers: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  premium!: boolean;
  userInfo!: string;

  constructor(
    public dashboardService: DashboardService,
    public localStorageService: LocalStorageService
  ) {
    this.userInfo = this.localStorageService.getItem('userInfo') as string;
    const userInfoParse = JSON.parse(this.userInfo);
    this.premium = userInfoParse.premium;
  }

  ngOnInit(): void {}

  // detect window resize
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.dashboardService.onResize(event);
  }
}
