import querySettingsRoutes from './querySettingsRoutes';


const AppLayout = () => import('@/layout/AppLayout');

const queriesGroupRoutes = [
  {
    path: '/feedback',
    component: AppLayout,
    meta: { sidebar: 'SettingsMenu', sidebarWidth: '236px' },  
    children: [
      ...querySettingsRoutes,
    ]
  }
];

export default queriesGroupRoutes;
