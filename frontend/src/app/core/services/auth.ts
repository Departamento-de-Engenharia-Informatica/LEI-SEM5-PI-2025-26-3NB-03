import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export type UserRole = 'PAO' | 'LO' | 'Rep' | 'Staff';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private userRole: UserRole | null = null;
  private isAuthenticated = false;

  constructor(private router: Router) {
    try {
      const storedRole = localStorage.getItem('userRole') as UserRole;
      if (storedRole) {
        this.userRole = storedRole;
        this.isAuthenticated = true;
      }
    } catch (e) {
      console.error('Erro ao inicializar Auth Service:', e);
    }
  }

  login(email: string, password: string): boolean {
    email = email.toLowerCase();

    if (email === 'pao@pm.pt' && password === 'admin') {
      this.setRole('PAO');
      return true;
    }

    if (email === 'lo@pm.pt' && password === 'admin') {
      this.setRole('LO');
      return true;
    }

    /*
      Note: No futuro, deve consultar a Backend API.
      Note: Assume que se a password for 'rep', é um Representative válido para já.
    */
    if (password === 'rep') {
        this.setRole('Rep');
        return true;
    }

    /*
      Note: No futuro, deve consultar a Backend API.
      Note: Assume que se a password for 'staff', é um StaffMember válido para já.
    */
    if (password === 'staff') {
        this.setRole('Staff');
        return true;
    }

    return false;
  }

  private setRole(role: UserRole) {
    this.userRole = role;
    this.isAuthenticated = true;
    localStorage.setItem('userRole', role);
  }

  logout() {
    this.userRole = null;
    this.isAuthenticated = false;
    localStorage.removeItem('userRole');
    this.router.navigate(['/auth/login']);
  }

  getRole(): UserRole | null {
    return this.userRole;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  hasRole(requiredRoles: UserRole[]): boolean {
    if (!this.isLoggedIn()) { 
      return false;
    }

    if (!this.userRole) {
      return false;
    }
    return requiredRoles.includes(this.userRole);
  }
}
