t import { Routes } from '@angular/router';
ou
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'feedback',
    loadComponent: () => import('./components/feedback/feedback.component').then(m => m.FeedbackComponent),
    canActivate: [() => import('./auth/auth.guard').then(m => m.authGuard)]
  },
  {
    path: 'rooms',
    loadComponent: () => import('./components/rooms/rooms.component').then(m => m.RoomsComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./components/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [() => import('./auth/auth.guard').then(m => m.authGuard)]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
