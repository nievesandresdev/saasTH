import stayRoutes from './stayRoutes';


const AppLayout = () => import('@/layout/AppLayout');

const stayGroupRoutes = [
  {
    path: '/estancias',
    component: AppLayout,
    meta: { sidebar: 'StayList', sidebarWidth: '304px' },  
    children: [
      ...stayRoutes,
    ]
  }
];

export default stayGroupRoutes;
