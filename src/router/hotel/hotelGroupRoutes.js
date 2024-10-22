import hotelProfileRoutes from './hotelProfileRoutes';
import hotelFacilityRoutes from './hotelFacilityRoutes';
import hotelConfigurationGroupRoutes from './hotelConfigurationGroupRoutes';


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
      ...hotelConfigurationGroupRoutes,
    ]
  }
];

export default hotelGroupRoutes;
