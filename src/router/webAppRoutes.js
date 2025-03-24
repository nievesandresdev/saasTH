const AppLayout = () => import('@/layout/AppLayout');

import Home from '@/Modules/WebApp/Home.vue';

import GeneralReferrals from '@/Modules/Referrals/GeneralReferrals';

const dashboardRoutes = [
  {
    path: '/webapp',
    component: AppLayout,
    meta: {sidebar: 'SettingsMenu', sidebarWidth: '236px',  requiresAuth: true },
    children: [
      {
        name: 'WebAppHome',
        path: '',
        component: Home
      },
      {
        name: 'Referrals',
        path: 'referidos',
        component: GeneralReferrals,
        meta: { sidebarRight: 'SidebarMockup' },

      },
    ],
  },
];

export default dashboardRoutes;
