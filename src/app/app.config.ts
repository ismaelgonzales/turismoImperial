import {
    ApplicationConfig,
    importProvidersFrom,
    provideZoneChangeDetection,
} from '@angular/core';

import { environment } from '../environments/environment.prod';
import {
    PreloadAllModules,
    provideRouter,
    withEnabledBlockingInitialNavigation,
    withHashLocation,
    withPreloading,
} from '@angular/router';
import { initializeApp } from 'firebase/app';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { routes } from './app.routes';
import {
    BrowserModule,
    provideClientHydration,
} from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
    provideHttpClient,
    withInterceptors,
    withFetch,
} from '@angular/common/http';
import { SpinnerInterceptor } from './core/interceptors/spinner.interceptor';
import { provideToastr } from 'ngx-toastr';
import {
    initializeApp as initializeApp_alias,
    provideFirebaseApp,
} from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        importProvidersFrom(BrowserModule, AngularFirestoreModule),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        provideRouter(
            routes,
            withHashLocation(),
            withEnabledBlockingInitialNavigation(),
            withPreloading(PreloadAllModules),
        ),
        provideClientHydration(),
        ConfirmationService,
        MessageService,
        DialogService,
        provideAnimations(),
        provideHttpClient(withFetch(), withInterceptors([SpinnerInterceptor])),
        provideAnimations(),
        provideToastr(),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
    ],
};
