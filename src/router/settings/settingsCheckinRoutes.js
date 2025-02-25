// settingsCheckinRoutes.js
const AppLayout = () => import('@/layout/AppLayout');

const settingsCheckinRoutes = [
  {
    path: '/webapp/checkin',
    component: AppLayout,
    meta: { sidebar: 'SettingsMenu', sidebarWidth: '236px',  requiresAuth: true, sidebarRight: 'SidebarMockup'},  
    children: [
      {
        name: 'CheckinGeneral',
        path: 'general',
        component: () => import('@/Modules/Settings/Checkin/General.vue'), 
      },
      {
        name: 'CheckinForms',
        path: 'formulario',
        component: () => import('@/Modules/Settings/Checkin/Forms.vue'), 
      }
    ],
  },
];

export default settingsCheckinRoutes;

