import userSettingsRoutes from './userSettingsRoutes';
const AppLayout = () => import('@/layout/AppLayout');
const UserPanel = () => import('@/Modules/User/Settings/UserPanel');

const userGroupRoutes = [
  {
    path: '/equipo',
    component: AppLayout,
    meta: { 
        displayedMenu: false,
        sidebar: 'Platform',
        sidebarWidth: '266px'
    },
    children: [
      ...userSettingsRoutes,
    ]
  },
  {
    path: '/cuenta',
    component: AppLayout,
    meta: { 
        displayedMenu: true,
    },
    children: [
      {
        name: 'UserPanel',
        path: 'panel',
        meta: { requiresAuth: true},
        component: UserPanel
      },
    ],


  }
];

export default userGroupRoutes;
