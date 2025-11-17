import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

export type UserRole = 'PAO' | 'LO' | 'Rep' | 'Staff';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private userRole: UserRole | null = null;
  private isAuthenticated = false;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const storedRole = localStorage.getItem('userRole') as UserRole;
      if (storedRole) {
        this.userRole = storedRole;
        this.isAuthenticated = true;
      }
    }
  }

  login(email: string, password: string): boolean {
    email = email.toLowerCase();

    /*
      Port Authority Officer (pao@pm.pt / admin)
      Pages: 2.2.1. Create/Update Vessel Type
             2.2.2. Create/Update Vessel
             2.2.3. Create/Update Dock
             2.2.4. Create/Update Storage Area
             2.2.5. Create Shipping Agent Organization
             2.2.6. Create/Update Representative
             2.2.7. Review Vessel Visit Notification
             3.3.2. 3D Representation of Port Structure
             3.3.3. Display Vessels and Major Resources
             3.3.4. Render 3D Models Appropriatelly
    */
    if (email === 'pao@pm.pt' && password === 'admin') {
      this.setRole('PAO');
      return true;
    }

    /*
      Logistics Operator (lo@pm.pt / admin)
      Pages: 2.2.11. Create/Update Staff Member
             2.2.12. Create/Update Physical Resource
             2.2.13. Create/Update Qualification
             3.3.2. 3D Representation of Port Structure
             3.3.3. Display Vessels and Major Resources
             3.3.4. Render 3D Models Appropriatelly
    */
    if (email === 'lo@pm.pt' && password === 'admin') {
      this.setRole('LO');
      return true;
    }

    /*
      Representative (qualquer email / rep)
      Pages: 2.2.8. Create Vessel Visit Notification
             2.2.9. Update Vessel Visit Notification
             2.2.10. View Vessel Visit Notifications Status
             3.3.2. 3D Representation of Port Structure
             3.3.4. Render 3D Models Appropriatelly
      Note: No futuro, deve consultar a Backend API.
      Note: Assume que se a password for 'rep', é um Representative válido para já.
    */
    if (password === 'rep') {
        this.setRole('Rep');
        return true;
    }

    /*
      Staff Member (qualquer email / staff)
      Pages: 3.3.2. 3D Representation of Port Structure
             3.3.4. Render 3D Models Appropriatelly
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
    this.router.navigate(['/login']);
  }

  getRole(): UserRole | null {
    return this.userRole;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  hasRole(requiredRoles: UserRole[]): boolean {
    if (!this.userRole) {
      return false;
    }
    return requiredRoles.includes(this.userRole);
  }
}