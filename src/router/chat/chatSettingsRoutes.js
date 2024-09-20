// chatSettingsRoutes.js
const GeneralSettings = () => import('@/Modules/Chat/Settings/GeneralSettings');
const AvailabilitySettings = () => import('@/Modules/Chat/Settings/AvailabilitySettings');
const AutomaticResponses = () => import('@/Modules/Chat/Settings/AutomaticResponses');

const chatSettingsRoutes = [
  {
    path: 'webapp',
    meta: { sidebarRight: 'SidebarMockup'},  
    children: [
      {
        name: 'GeneralSettings',
        path: 'general',
        component: GeneralSettings
      },
      {
        name: 'AvailabilitySettings',
        path: 'availability',
        component: AvailabilitySettings
      },
      {
        name: 'AutomaticResponses',
        path: 'automatic-responses',
        component: AutomaticResponses
      },
      
    ],
  },
];

export default chatSettingsRoutes;
