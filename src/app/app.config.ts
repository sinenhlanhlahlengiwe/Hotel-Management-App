import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { provideAuth, getAuth} from '@angular/fire/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBRjiHTyFos-6nuu9fui798hqakwxk_5MI",
  authDomain: "hotel-management-app-413f9.firebaseapp.com",
  projectId: "hotel-management-app-413f9",
  storageBucket: "hotel-management-app-413f9.firebasestorage.app",
  messagingSenderId: "787225024162",
  appId: "1:787225024162:web:97fa9f6167954a335ae9fb",
  measurementId: "G-6W5NFWFJGB"
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),
  provideFirebaseApp(() => initializeApp(firebaseConfig)),
  provideAuth(() => getAuth())
  ]
};
