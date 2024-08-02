const AppLayout = () => import('@/layout/AppLayout');

import AdminPage from '@/Modules/Customization/AdminPage.vue';

const dashboardRoutes = [
  {
    path: '/personalizacion',
    component: AppLayout,
    meta: { sidebar: 'SettingsMenu', sidebarWidth: '236px' },  
    children: [
      {
        name: 'Customization',
        path: '',
        meta: { requiresAuth: true, sidebarRight: 'SidebarMockup' },
        component: AdminPage,
      },
    ],
  },
];

export default dashboardRoutes;
