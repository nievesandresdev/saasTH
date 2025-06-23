const ConfigurationPage = () => import('@/Modules/Hotel/ConfigurationPage');
const DestacadoPage = () => import('@/Modules/Hotel/DestacadoPage');

const hotelConfigurationRoutes = [
  {
    path: 'configuracion',
    children: [
      {
        name: 'Configuracion',
        path: '',
        component: ConfigurationPage,
        meta: { sidebarRight: 'SidebarMockup' }
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
