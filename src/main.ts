import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

const firebaseConfig = {
  apiKey: "AIzaSyBRjiHTyFos-6nuu9fui798hqakwxk_5MI",
  authDomain: "hotel-management-app-413f9.firebaseapp.com",
  projectId: "hotel-management-app-413f9",
  storageBucket: "hotel-management-app-413f9.firebasestorage.app",
  messagingSenderId: "787225024162",
  appId: "1:787225024162:web:97fa9f6167954a335ae9fb",
  measurementId: "G-6W5NFWFJGB"
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


