import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Auth } from '../services/auth';

export const AuthResolver: ResolveFn<boolean> = () => {
  const authService = inject(Auth);

  authService.isLoggedIn(); 
  
  return true; 
};
