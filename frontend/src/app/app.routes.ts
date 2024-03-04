import { Routes } from '@angular/router';
import { DashboardComponent } from './shared/layouts/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BoardDetailComponent } from './pages/board-detail/board-detail.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { HistoryComponent } from './pages/history/history.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'board/:id', component: BoardDetailComponent },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
