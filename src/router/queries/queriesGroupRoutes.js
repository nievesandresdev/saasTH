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
  },
  {
    path: '/seguimiento/general-report',
    component: () => import('@/Modules/Queries/GeneralReport.vue'),
    meta: { sidebar: null, sidebarWidth: null },
    props: (route) => ({ queryRouter: {...route.query} }),
  }
];

export default queriesGroupRoutes;
