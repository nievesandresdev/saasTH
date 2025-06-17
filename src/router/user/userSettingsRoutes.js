//views
const NotificationsSettings = () => import('@/Modules/User/Settings/NotificationsSettings');
const UsersSettings = () => import('@/Modules/User/Settings/UsersSettings');
const UserPanel = () => import('@/Modules/User/Settings/UserPanel');
const ExternalPlatform = () => import('@/Modules/User/Settings/ExternalPlatforms');
const Integrations = () => import('@/Modules/User/Settings/Integrations/IntegrationsPage');
const IntegrationsPMS = () => import('@/Modules/User/Settings/Integrations/IntegrationsPMS');

const userSettingsRoutes = [
  {
    path: 'configuracion',
    meta: { requiresAuth: true},
    children: [
      {
        name: 'UserNotificationsSettings',
        path: 'notificaciones',
        component: NotificationsSettings
      },
      {
        name: 'UsersSettings',
        path: 'usuarios',
        component: UsersSettings
      },
      /* {
        name: 'UserPanel',
        path: 'panel',
        component: UserPanel
      }, */
      {
        name: 'ExternalPlatforms',
        path: 'plataformas-externas',
        component : ExternalPlatform
      },
      {
        name: 'Integrations',
        path: 'integraciones',
        component : Integrations
      },
      {
        name: 'IntegrationsPMS',
        path: 'integraciones-pms',
        component : IntegrationsPMS
      }
    ],
  },
];

export default userSettingsRoutes;
