//views
const NotificationsSettings = () => import('@/Modules/User/Settings/NotificationsSettings');
const UsersSettings = () => import('@/Modules/User/Settings/UsersSettings');

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
    ],
  },
];

export default userSettingsRoutes;
