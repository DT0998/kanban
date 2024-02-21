import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { AuthService } from './shared/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import { ShareService } from './shared/services/share.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideEffects(),
    provideStore(),
    ...ShareService,
    importProvidersFrom(HttpClientModule),
    provideHttpClient(
      withInterceptors([
        // Add interceptors here
        authInterceptor,
      ])
    ),
  ],
};
