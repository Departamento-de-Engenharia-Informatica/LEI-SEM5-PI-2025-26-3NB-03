import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/role-guard';
import { Layout } from './core/components/layout/layout';
import { Representative } from './features/representative/representative';
import { VesselType } from './features/vesseltype/vesseltype';
import { AuthResolver } from './core/resolvers/auth-resolver';
import {StaffList} from './features/staff/staff-list';
import {StaffCreate} from './features/staff/staff-create';
import {StaffEdit} from './features/staff/staff-edit';
import { StorageArea } from './features/storagearea/storagearea';

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
        path: 'vesseltypes',
        component: VesselType,
        title: 'VesselType',
        canActivate: [roleGuard],
        data: { roles: ['PAO'] },
      },
      {
        path: 'storageareas',
        component: StorageArea,
        title: 'Storage Areas',
        canActivate: [roleGuard],
        data: { roles: ['PAO'] },
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
      { path: 'staff', component: StaffList },
      { path: 'staff/create', component: StaffCreate },
      { path: 'staff/:code', component: StaffEdit },
      {
        path: 'vvns',
        loadComponent: () => import('./features/vvns/vvns-list').then(m => m.VvnsListComponent)
      },
      {
        path: 'port',
        loadComponent: () => import('./features/port-visualization/port-visualization').then(m => m.PortVisualization),
        canMatch: [roleGuard],
        data: {
          roles: ['PAO', 'LO', 'Rep', 'Staff'],
          title: '3D Port Visualization'
        },
      },
    ]},
    {
        path: '**',
        redirectTo: 'dashboard'
    },
];
