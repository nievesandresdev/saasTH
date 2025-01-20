const ConfigurationPage = () => import('@/Modules/Hotel/ConfigurationPage');

const hotelConfigurationRoutes = [
  {
    path: 'configuracion',
    meta: { sidebarRight: 'SidebarMockup'},  
    children: [
      {
        name: 'Configuracion',
        path: '',
        component: ConfigurationPage
      },
    ],
  },
];

export default hotelConfigurationRoutes;
