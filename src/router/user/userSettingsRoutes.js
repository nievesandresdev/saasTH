const NotificationsSettings = () => import('@/Modules/User/Settings/NotificationsSettings');

const userSettingsRoutes = [
  {
    path: 'configuracion',
    children: [
      {
        name: 'UserNotificationsSettings',
        path: 'notificaciones',
        component: NotificationsSettings
      },
    ],
  },
];

export default userSettingsRoutes;
