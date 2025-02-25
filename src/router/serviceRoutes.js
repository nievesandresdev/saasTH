const AppLayout = () => import('@/layout/AppLayout');

const AdminPageConfort = () => import('@/Modules/Confort/AdminPage');
const AdminPageTransport = () => import('@/Modules/Transport/AdminPage');
const AdminPageActivity = () => import('@/Modules/Experience/ListPage');

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
      {
        name: 'Experiences',
        path: 'actividades',
        component: AdminPageActivity,
      },
    ]
  }
];

export default serviceRoutes;
