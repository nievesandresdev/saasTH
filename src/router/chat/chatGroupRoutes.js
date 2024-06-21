import chatSettingsRoutes from './chatSettingsRoutes';


const AppLayout = () => import('@/layout/AppLayout');

const settingsGroupRoutes = [
  {
    path: '/chat',
    component: AppLayout,
    meta: { sidebar: 'SettingsMenu', sidebarWidth: '236px' },  
    children: [
      ...chatSettingsRoutes,
    ]
  }
];

export default settingsGroupRoutes;
