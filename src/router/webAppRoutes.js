const AppLayout = () => import('@/layout/AppLayout');

import Home from '@/Modules/WebApp/Home.vue';

const dashboardRoutes = [
  {
    path: '/webapp',
    component: AppLayout,
    meta: {sidebar: 'SettingsMenu', sidebarWidth: '236px', requiresAuth: true },
    children: [
      {
        name: 'WebAppHome',
        path: '',
        component: Home
      },
    ],
  },
];

export default dashboardRoutes;
