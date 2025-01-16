const AppLayout = () => import('@/layout/AppLayout');

const AdminPageConfort = () => import('@/Modules/Confort/AdminPage');
const AdminPageTransport = () => import('@/Modules/Transport/AdminPage');

const serviceRoutes = [
  {
    path: '/servicios',
    component: AppLayout,
    meta: { requiresAuth: true, sidebar: 'SettingsMenu',  sidebarRight: 'SidebarMockup', sidebarWidth: '236px' },
    children: [
      {
        name: 'Conforts',
        path: 'conforts',
        component: AdminPageConfort,
      },
      {
        name: 'Transports',
        path: 'transportes',
        component: AdminPageTransport,
      },
    ]
  }
];

export default serviceRoutes;
