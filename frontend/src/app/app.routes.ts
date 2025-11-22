import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/role-guard';
import { Layout } from './core/components/layout/layout';
import { Representative } from './features/representative/representative';
import { AuthResolver } from './core/resolvers/auth-resolver';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)
    },
    {
        path: '',
        component: Layout,
        resolve: {
            authReady: AuthResolver
        },
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard-module').then(m => m.DashboardModule),
                canActivate: [roleGuard],
                data: { roles: ['PAO', 'LO', 'Rep', 'Staff'] },
            },
            {
                path: 'representatives',
                component: Representative,
                title: 'Representative',
                canActivate: [roleGuard],
                data: { roles: ['PAO'] },
            },

          {
            path: 'qualifications',
            loadComponent: () =>
              import('./features/qualifications/qualifications-list').then(m => m.QualificationsList),
            title: 'Qualificações',
            canActivate: [roleGuard],
            data: { roles: ['LO'] },
          },
          {
            path: 'qualifications/create',
            loadComponent: () =>
              import('./features/qualifications/qualifications-create').then(m => m.QualificationsCreate),
            title: 'Criar Qualificação',
            canActivate: [roleGuard],
            data: { roles: ['LO'] },
          },
          {
            path: 'qualifications/:id',
            loadComponent: () =>
              import('./features/qualifications/qualifications-edit').then(m => m.QualificationsEdit),
            title: 'Editar Qualificação',
            canActivate: [roleGuard],
            data: { roles: ['LO'] },
          },
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    },
];
