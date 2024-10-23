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
import { initializeApp } from 'firebase/app';

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
        provideFirebaseApp(() =>
            initializeApp({
                projectId: 'authentication-imperial',
                appId: '1:303415919216:web:271dc37a9ae941a26d2ab5',
                storageBucket: 'authentication-imperial.appspot.com',
                apiKey: 'AIzaSyDIOJfshlL6B_N0ZR5dCYQZ9PQkxsxf3hw',
                authDomain: 'authentication-imperial.firebaseapp.com',
                messagingSenderId: '303415919216',
            }),
        ),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
    ],
};
