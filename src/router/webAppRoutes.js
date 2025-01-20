const AppLayout = () => import('@/layout/AppLayout');

import Home from '@/Modules/WebApp/Home.vue';
import PromoteWebapp from '@/Modules/Comunication/PromoteWebapp';
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
        name: 'PromoteWebApp',
        path: 'promociona-webapp',
        component: PromoteWebapp
      },
      {
        name: 'Referrals',
        path: 'referidos',
        component: GeneralReferrals,
        meta: { sidebarRight: 'SidebarMockup' },

      }
    ],
  },
];

export default dashboardRoutes;
