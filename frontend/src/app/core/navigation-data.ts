import { UserRole } from './services/auth';

export interface MenuItem {
  label: string;
  link: string;
  requiredRoles: UserRole[];
}

export const MENU_ITEMS: MenuItem[] = [
  { label: 'MENU.DASHBOARD', link: '/dashboard', requiredRoles: ['PAO', 'LO', 'Rep', 'Staff'] },

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
  { label: 'MENU.VESSELTYPES', link: '/vesseltypes', requiredRoles: ['PAO'] },
  { label: 'MENU.VESSELS', link: '/vessels', requiredRoles: ['PAO'] },
  { label: 'MENU.DOCKS', link: '/docks', requiredRoles: ['PAO'] },
  { label: 'MENU.STORAGE_AREAS', link: '/storageareas', requiredRoles: ['PAO'] },
  { label: 'MENU.SHIPPING_AGENT_ORGANIZATIONS', link: '/shippingagentorganizations', requiredRoles: ['PAO'] },
  { label: 'MENU.REPRESENTATIVES', link: '/representatives', requiredRoles: ['PAO'] },
  { label: 'MENU.REVIEW_VVNS', link: '/reviewvvns', requiredRoles: ['PAO'] },
  { label: 'MENU.CREATE_CATEGORY', link: '/categories/create', requiredRoles: ['PAO'] },

  /*
    Logistics Operator (lo@pm.pt / admin)
    Pages: 2.2.11. Create/Update Staff Member
           2.2.12. Create/Update Physical Resource
           2.2.13. Create/Update Qualification
           3.3.2. 3D Representation of Port Structure
           3.3.3. Display Vessels and Major Resources
           3.3.4. Render 3D Models Appropriatelly
  */
  { label: 'MENU.STAFF', link: '/staff', requiredRoles: ['LO'] },
  { label: 'MENU.PHYSICAL_RESOURCES', link: '/physicalresources', requiredRoles: ['LO'] },
  { label: 'MENU.QUALIFICATIONS', link: '/qualifications', requiredRoles: ['LO'] },
  { label: 'MENU.CREATE_TASK', link: '/tasks/create', requiredRoles: ['LO'] },


  {  label: 'MENU.VVE_MANAGEMENT', link: '/visit-executions/management', requiredRoles: ['LO']},
  /*
    Representative (qualquer email / rep)
    Pages: 2.2.8. Create Vessel Visit Notification
           2.2.9. Update Vessel Visit Notification
           2.2.10. View Vessel Visit Notifications Status
           3.3.2. 3D Representation of Port Structure
           3.3.4. Render 3D Models Appropriatelly
  */
  { label: 'MENU.CREATE_VVNS', link: 'vvns/create', requiredRoles: ['Rep'] },
  { label: 'MENU.UPDATE_VVNS', link: '/updatevvns', requiredRoles: ['Rep'] },
  { label: 'MENU.VIEW_VVNS', link: '/viewvvns', requiredRoles: ['Rep'] },

  /*
    Staff Member (qualquer email / staff)
    Pages: 3.3.2. 3D Representation of Port Structure
           3.3.4. Render 3D Models Appropriatelly
  */
  {
    label: 'MENU.TASKS_LIST',
    link: '/tasks',
    requiredRoles: ['PAO', 'LO']
  },
  {
    label: 'MENU.CATEGORIES_LIST',
    link: '/categories',
    requiredRoles: ['PAO', 'LO']
  },
  {
    label: 'MENU.VVE_CREATE',
    link: '/visit-executions/create',
    requiredRoles: ['LO']
  },
  {
    label: 'MENU.VVE_UPDATE_BERTH_DOCK',
    link: '/visit-executions/update-berth-dock',
    requiredRoles: ['LO']
  },
  {
    label: 'MENU.OP_PLANS',
    link: '/operation-plans',
    requiredRoles: ['LO']
  },
  {
    label: 'MENU.INCIDENTS',
    link: '/incidents',
    requiredRoles: ['LO']
  },
  { label: 'MENU.PORT', link: '/port', requiredRoles: ['PAO', 'LO', 'Rep', 'Staff'] },
];
