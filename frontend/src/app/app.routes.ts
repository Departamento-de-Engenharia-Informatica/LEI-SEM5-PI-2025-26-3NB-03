import { Routes } from '@angular/router';

import { roleGuard } from './core/guards/role-guard';
import { Layout } from './core/components/layout/layout';

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
    path: '',
    component: Layout,
    canActivate: [roleGuard],
    data: { roles: ['PAO', 'LO', 'Rep', 'Staff'] },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard-module').then(m => m.DashboardModule)
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
