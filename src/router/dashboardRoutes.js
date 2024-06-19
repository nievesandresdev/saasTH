const AppLayout = () => import('@/layout/AppLayout');

import Index from '@/Modules/Dashboard/IndexPage.vue';

const dashboardRoutes = [
    {
      path: '/dashboard',
      component: AppLayout,
      children: [
        {
          name: 'DashboardIndex',
          path: '',
          component: Index,
          meta: { sidebarRight: 'SidebarMockup'},  
        },
      ],
    },
  ];

export default dashboardRoutes;
