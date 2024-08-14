const AppLayout = () => import('@/layout/AppLayout');

import AdminPage from '@/Modules/Review/AdminPage.vue';
import DetailPage from '@/Modules/Review/DetailPage.vue';

const reviewRoutes = [
  {
    path: '/resenas',
    component: AppLayout,
    meta: { sidebar: 'ReviewSiderbar', sidebarWidth: '304px' },
    children: [
      {
        name: 'Reviews',
        path: '',
        meta: { requiresAuth: true },
        component: AdminPage,
      },
      {
        path: ':ota',
        
        children: [
          {
            name: 'ReviewDetail',
            meta: { requiresAuth: true },
            path: ':id',
            component: DetailPage,
          }
        ],
      },
    ],
  },
];

export default reviewRoutes;
