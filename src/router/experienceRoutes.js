const AppLayout = () => import('@/layout/AppLayout');

import ListPage from '@/Modules/Experience/ListPage.vue';

const dashboardRoutes = [
  // {
  //   path: '/experiencias',
  //   component: AppLayout,
  //   meta: { requiresAuth: true,sidebar: 'SettingsMenu', sidebarWidth: '236px' },  
  //   children: [
  //     {
  //       name: 'Experiences',
  //       path: '',
  //       meta: { requiresAuth: true, sidebarRight: 'SidebarMockup' },
  //       component: ListPage,
  //       props: (route) => ({ queryRouter: {...route.query} }),
  //     },
  //   ],
  // },
];

export default dashboardRoutes;
