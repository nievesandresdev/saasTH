import chatSettingsRoutes from './chatSettingsRoutes';


const AppLayout = () => import('@/layout/AppLayout');

const settingsGroupRoutes = [
  {
    path: '/configuracion',
    component: AppLayout,
    meta: { sidebar: 'SettingsLayout', sidebarWidth: '236px' },  
    children: [
      ...chatSettingsRoutes,
    ]
  }
];

export default settingsGroupRoutes;
