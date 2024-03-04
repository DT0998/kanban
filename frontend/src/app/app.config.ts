import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { ShareService } from './shared/services/share.service';
import * as fromApp from './shared/store/store.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideEffects(),
    provideStore(fromApp.appReducer),
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
