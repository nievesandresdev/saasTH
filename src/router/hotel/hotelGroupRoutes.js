import hotelProfileRoutes from './hotelProfileRoutes';
import hotelFacilityRoutes from './hotelFacilityRoutes';


const AppLayout = () => import('@/layout/AppLayout');

const hotelGroupRoutes = [
  {
    path: '/alojamiento',
    component: AppLayout,
    //meta: { sidebar: 'SettingsMenu', sidebarWidth: '236px',showPreloaderPage: false },  
    meta: { sidebar: 'SettingsMenu', sidebarWidth: '236px'},  
    children: [
      ...hotelProfileRoutes,
      ...hotelFacilityRoutes,
    ]
  }
];

export default hotelGroupRoutes;
