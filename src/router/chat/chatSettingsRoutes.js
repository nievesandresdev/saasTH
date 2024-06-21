// chatSettingsRoutes.js
const GeneralSettings = () => import('@/Modules/Chat/Settings/GeneralSettings');

const chatSettingsRoutes = [
  {
    path: 'configuracion',
    meta: { sidebarRight: 'SidebarMockup'},  
    children: [
      {
        name: 'GeneralSettings',
        path: 'general',
        component: GeneralSettings
      },
    ],
  },
];

export default chatSettingsRoutes;
