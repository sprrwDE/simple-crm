import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    MatNativeDateModule,
    provideNativeDateAdapter(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'simple-crm-28a05',
        appId: '1:245225813153:web:176f9946d7fb922bb62ce0',
        storageBucket: 'simple-crm-28a05.firebasestorage.app',
        apiKey: 'AIzaSyAkAydBHzVSOUdyDG4yjvsUZHAP5TFss00',
        authDomain: 'simple-crm-28a05.firebaseapp.com',
        messagingSenderId: '245225813153',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
