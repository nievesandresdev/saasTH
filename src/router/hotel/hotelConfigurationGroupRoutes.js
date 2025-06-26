const HomeConfigPage = () => import('@/Modules/Hotel/HomeConfigPage');
const DestacadoPage = () => import('@/Modules/Hotel/DestacadoPage');

const hotelConfigurationRoutes = [
  {
    path: 'configuracion',
    children: [
      { 
        name: 'HomeConfigPage',
        path: 'home',
        component: HomeConfigPage,
        // meta: { sidebarRight: 'SidebarMockup' }
      },
      {
        name: 'Destacado',
        path: 'destacado',
        component: DestacadoPage
      },
    ],
  },
];

export default hotelConfigurationRoutes;
