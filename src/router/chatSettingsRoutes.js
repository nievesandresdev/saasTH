// chatSettingsRoutes.js
const GeneralSettings = () => import('@/Modules/Chat/Settings/GeneralSettings');

const chatSettingsRoutes = [
  {
    path: 'chat',
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
