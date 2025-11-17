import { Routes } from '@angular/router';

import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '', 
    loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    canActivate: [roleGuard],
    data: { roles: ['PAO', 'LO', 'Rep', 'Staff'] },
    loadChildren: () => import('./dashboard/dashboard-module').then(m => m.DashboardModule)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];