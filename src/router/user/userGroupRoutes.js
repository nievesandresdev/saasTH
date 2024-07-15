import userSettingsRoutes from './userSettingsRoutes';
const AppLayout = () => import('@/layout/AppLayout');

const userGroupRoutes = [
  {
    path: '/usuarios',
    component: AppLayout,
    meta: { 
        displayedMenu: false,
        sidebar: 'Platform',
        sidebarWidth: '236px'
    },
    children: [
      ...userSettingsRoutes,
    ]
  }
];

export default userGroupRoutes;
