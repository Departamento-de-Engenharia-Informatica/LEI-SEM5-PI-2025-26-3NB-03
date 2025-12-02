import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Auth, UserRole } from '../services/auth';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(Auth);
  const router = inject(Router);

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