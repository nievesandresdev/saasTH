//views
const NotificationsSettings = () => import('@/Modules/User/Settings/NotificationsSettings');
const UsersSettings = () => import('@/Modules/User/Settings/UsersSettings');
const UserPanel = () => import('@/Modules/User/Settings/UserPanel');
const ExternalPlatform = () => import('@/Modules/User/Settings/ExternalPlatforms');

const userSettingsRoutes = [
  {
    path: 'configuracion',
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
      {
        name: 'UserPanel',
        path: 'panel',
        component: UserPanel
      },
      {
        name: 'ExternalPlatforms',
        path: 'plataformas-externas',
        component : ExternalPlatform
      }
    ],
  },
];

export default userSettingsRoutes;
