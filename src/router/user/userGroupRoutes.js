import userSettingsRoutes from './userSettingsRoutes';
const AppLayout = () => import('@/layout/AppLayout');

const userGroupRoutes = [
  {
    path: '/usuarios',
    component: AppLayout,
    meta: { 
        displayedMenu: false,
        sidebar: 'Platform',
        sidebarWidth: '266px'
    },
    children: [
      ...userSettingsRoutes,
    ]
  }
];

export default userGroupRoutes;
