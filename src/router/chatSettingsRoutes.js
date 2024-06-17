// chatSettingsRoutes.js
const GeneralSettings = () => import('@/Modules/Chat/Settings/GeneralSettings');

const chatSettingsRoutes = [
  {
    path: 'chat',
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