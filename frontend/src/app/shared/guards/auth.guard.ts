import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/localStorage/localStorage.service';
import { inject } from '@angular/core';
import { UserInfo } from '../models/user-info.model';

export const authGuard: CanActivateFn = (route, state) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);
  const userInfo: string | null = localStorageService.getItem('userInfo');
  const userInfoParsed: UserInfo | null = userInfo
    ? (JSON.parse(userInfo) as UserInfo)
    : null;

  // Check if the user is authenticated
  if (userInfoParsed?.accessToken) {
    // If the user is already authenticated and tries to access the login page,
    // redirect them to another route (e.g., dashboard)
    if (state.url === '/login') {
      router.navigateByUrl('/dashboard');
      return false;
    }
    // If the user is authenticated, allow access to the requested route
    return true;
  } else {
    if (state.url.startsWith('/dashboard')) {
      router.navigateByUrl('/login');
      return false; // Cancel navigation to the dashboard
    }
    // If the user is not authenticated, allow access to the requested route
    return true;
  }
};
