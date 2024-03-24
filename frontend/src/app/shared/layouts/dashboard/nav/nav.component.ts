import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  ionHomeOutline,
  ionSettingsOutline,
  ionReorderThreeOutline,
  ionPersonCircleOutline,
} from '@ng-icons/ionicons';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LocalStorageService } from '../../../services/localStorage/localStorage.service';
import { WagmiService } from '../../../services/wagmi/wagmi.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    RouterOutlet,
    RouterLink,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
  ],
  providers: [
    provideIcons({
      ionHomeOutline,
      ionSettingsOutline,
      ionReorderThreeOutline,
      ionPersonCircleOutline  
    }),
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavbarComponent implements OnInit {
  @Input() premium!: boolean;

  constructor(
    public dashboardService: DashboardService,
    public localStorageService: LocalStorageService,
    public wagmiService: WagmiService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  toggleSidebarMobile = () => {
    this.dashboardService.toggleSidebarMobile();
  };

  handleLogout = async () => {
    await this.wagmiService.disconnectWallet();
    this.localStorageService.removeItem('userInfo');
    this.router.navigateByUrl('/login');
  };
}
