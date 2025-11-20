import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Auth, UserRole } from '../services/auth';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(Auth);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true; 
  }

  console.log('Role Guard Fired. Is Logged In:', authService.isLoggedIn());

  if (!authService.isLoggedIn()) {
    return router.parseUrl('/auth/login');
  }

  const requiredRoles = route.data['roles'] as UserRole[];

  const isAuthorized = authService.hasRole(requiredRoles);

  if (isAuthorized) {
    return true;
  } else {
    alert('Error 403 - Forbidden: You don\'t have permissions to access this page.');
    return router.parseUrl('/dashboard'); 
  }
};