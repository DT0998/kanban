import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { LocalStorageService } from '../../services/localStorage/localStorage.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './nav/nav.component';
import { ProfileService } from '../../services/profile/profile.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../shared/store/store.reducer';
import * as PremiumActions from '../../../shared/store/premium/premium.actions';

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
export class DashboardComponent implements OnInit {
  premium!: boolean | undefined;
  userInfo!: string;
  userAddress!: string;

  constructor(
    public dashboardService: DashboardService,
    public localStorageService: LocalStorageService,
    private profileService: ProfileService,
    public store: Store<fromApp.AppState>
  ) {
    this.userInfo = this.localStorageService.getItem('userInfo') as string;
    const userInfoParse = JSON.parse(this.userInfo);
    if (userInfoParse) {
      this.userAddress = userInfoParse.address;
    }
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile = async () => {
    // Attempt to get the profile data
    try {
      const res = await this.profileService.getProfile(this.userAddress);
      // Update the user info in the local storage
      this.profileService.userInfo.name = res.data.name;
      this.profileService.userInfo.premium = res.data.premium;
      const userInfoParse = JSON.parse(this.userInfo);
      userInfoParse.name = res.data.name;
      userInfoParse.premium = res.data.premium;
      this.premium = res.data.premium;
      this.store.dispatch(new PremiumActions.GetPremium(res.data.premium));
      this.localStorageService.setItem(
        'userInfo',
        JSON.stringify(userInfoParse)
      );
    } catch (error) {
      // Handle the error
      console.error('Error fetching profile data:', error);
    }
  };

  // detect window resize
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.dashboardService.onResize(event);
  }
}
