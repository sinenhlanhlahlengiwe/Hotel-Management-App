import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

export const authGuard = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await firstValueFrom(authService.isAuthenticated());
  if (isAuthenticated) {
    return true;
  }

  // Redirect to login page
  return router.parseUrl('/login');
};