const AppLayout = () => import('@/layout/AppLayout');

import AdminPage from '@/Modules/Appearence/AdminPage.vue';

const appearenceRoutes = [
  {
    path: '/apariencia',
    component: AppLayout,
    meta: { sidebar: 'SettingsMenu', sidebarWidth: '236px' },  
    children: [
      {
        name: 'Appearence',
        path: '',
        meta: { requiresAuth: true, sidebarRight: 'SidebarMockup' },
        component: AdminPage,
      },
    ],
  },
];

export default appearenceRoutes;
