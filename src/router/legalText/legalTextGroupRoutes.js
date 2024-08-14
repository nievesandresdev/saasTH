import legalTextSettingsRoute from './legalTextSettingsRoute';


const AppLayout = () => import('@/layout/AppLayout');

const settingsGroupRoutes = [
  {
    path: '/legal',
    component: AppLayout,
    meta: { sidebar: 'SettingsMenu', sidebarWidth: '236px', requiresAuth: true },  
    children: [
      ...legalTextSettingsRoute,
    ]
  }
];

export default settingsGroupRoutes;
