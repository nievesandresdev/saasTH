const AppLayout = () => import('@/layout/AppLayout');

import ListPage from '@/Modules/Place/ListPage.vue';

const dashboardRoutes = [
  {
    path: '/places',
    component: AppLayout,
    component: AppLayout,
    meta: { sidebar: 'SettingsMenu', sidebarWidth: '236px' },  
    children: [
      {
        name: 'Places',
        path: '',
        meta: { requiresAuth: true, sidebarRight: 'SidebarMockup' },
        component: ListPage
      },
    ],
  },
];

export default dashboardRoutes;
