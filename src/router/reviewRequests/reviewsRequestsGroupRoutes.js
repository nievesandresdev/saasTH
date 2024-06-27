import requestsSettingsRoutes from './requestsSettingsRoutes';


const AppLayout = () => import('@/layout/AppLayout');

const settingsGroupRoutes = [
  {
    path: '/solicitud-de-resenas',
    component: AppLayout,
    meta: { sidebar: 'SettingsMenu', sidebarWidth: '236px' },  
    children: [
      ...requestsSettingsRoutes,
    ]
  }
];

export default settingsGroupRoutes;
