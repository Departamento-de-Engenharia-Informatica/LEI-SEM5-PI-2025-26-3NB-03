import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/role-guard';
import { Layout } from './core/components/layout/layout';
import { Representative } from './features/representative/representative';
import { VesselType } from './features/vesseltype/vesseltype';
import { Dock } from './features/dock/dock';
import { AuthResolver } from './core/resolvers/auth-resolver';
import { StaffList } from './features/staff/staff-list';
import { StaffCreate } from './features/staff/staff-create';
import { StaffEdit } from './features/staff/staff-edit';
import { StorageArea } from './features/storagearea/storagearea';
import { ShippingAgentOrganization } from './features/shippingagentorganization/shippingagentorganization';
import { NotFound } from './shared/components/notfound';
import { PhysicalResource } from './features/physicalresource/physicalresource';

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
        path: 'docks',
        component: Dock,
        title: 'Docks',
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
        path: 'physicalresources',
        component: PhysicalResource,
        title: 'PhysicalResource',
        canActivate: [roleGuard],
        data: { roles: ['LO'] },
      },
      {
        path: 'shippingagentorganizations',
        component: ShippingAgentOrganization,
        title: 'Shipping Agent Organizations',
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
        path: 'viewvvns',
        loadComponent: () => import('./features/vvns/vvns-list').then(m => m.VvnsListComponent)
      },
      {
        path: 'vvns/create',
        loadComponent: () => import('./features/vvns/vvns-create')
          .then(m => m.VvnsCreateComponent),
        canActivate: [roleGuard],
        data: { roles: ['Rep'] }
      },
      {
        path: 'categories/create',
        loadComponent: () =>
          import('./features/task-category/category-create/category-create.component')
            .then(m => m.CategoryCreateComponent),
        title: 'Criar Categoria de Tarefa',
        canActivate: [roleGuard],
        data: { roles: ['PAO'] }
      },
      {
        path: 'tasks/create',
        loadComponent: () =>
          import('./features/task/task-create/task-create.component')
            .then(m => m.TaskCreateComponent),
        title: 'Criar Tarefa',
        canActivate: [roleGuard],
        data: { roles: ['LO'] }
      },
      {
        path: 'tasks',
        loadComponent: () => import('./features/task/task-list/task-list.component').then(m => m.TaskListComponent),
        title: 'Tarefas',
        canActivate: [roleGuard], data: { roles: ['PAO', 'LO'] }
      },
      {
        path: 'categories',
        loadComponent: () => import('./features/task-category/category-list/category-list.component').then(m => m.CategoryListComponent),
        title: 'Categorias',
        canActivate: [roleGuard], data: { roles: ['PAO', 'LO'] }
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
      { path: '**', component: NotFound },
    ]},
    {
        path: '**',
        redirectTo: 'dashboard'
    },
    { path: '**', component: NotFound }
];
