const AppLayout = () => import('@/layout/AppLayout');

import AdminPage from '@/Modules/Gallery/AdminPage.vue';

const dashboardRoutes = [
  {
    path: '/galeria',
    component: AppLayout,
    component: AppLayout,
    meta: { sidebar: 'SettingsMenu', sidebarWidth: '236px' },  
    children: [
      {
        name: 'Gallery',
        path: '',
        meta: { requiresAuth: true },
        component: AdminPage,
      },
    ],
  },
];

export default dashboardRoutes;
