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
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    },
];
