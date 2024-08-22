import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withPreloading,
} from '@angular/router';

import { routes } from './app.routes';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { SpinnerInterceptor } from './core/interceptors/spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(BrowserModule),
    provideRouter(
      routes,
      withHashLocation(),
      withEnabledBlockingInitialNavigation(),
      withPreloading(PreloadAllModules)
    ),
    provideClientHydration(),
    ConfirmationService,
    MessageService,
    DialogService,
    provideAnimations(),
    provideHttpClient(
      withInterceptors([SpinnerInterceptor])
    ),


  ],
};
