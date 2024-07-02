import hotelProfileRoutes from './hotelProfileGroupRoutes';


const AppLayout = () => import('@/layout/AppLayout');

const profileGroupRoutes = [
  {
    path: '/alojamiento',
    component: AppLayout,
    meta: { sidebar: 'SettingsMenu', sidebarWidth: '236px' },  
    children: [
      ...hotelProfileRoutes,
    ]
  }
];

export default profileGroupRoutes;
