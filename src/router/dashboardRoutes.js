const AppLayout = () => import('@/layout/AppLayout');

import Index from '@/Modules/Dashboard/IndexPage.vue';

const dashboardRoutes = [
  {
    path: '/dashboard',
    component: AppLayout,
    meta: { requiresAuth: true, sidebarRight: 'SidebarMockup', displayedMenu: true },
    children: [
      {
        name: 'DashboardIndex',
        path: '',
        component: Index
      },
    ],
  },
];

export default dashboardRoutes;
