const AppLayout = () => import('@/layout/AppLayout');

import HomePage from '@/Modules/Marketplace/HomePage.vue';

const marketplaceRoutes = [
  {
    path: '/marketplace',
    component: AppLayout,
    meta: { requiresAuth: true,displayedMenu: true },
    children: [
      {
        name: 'Marketplace',
        path: '',
        component: HomePage,
      },
    ],
  },
];

export default marketplaceRoutes;
