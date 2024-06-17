// settingsGroupRoutes.js
import chatSettingsRoutes from './chatSettingsRoutes';
const AppLayout = () => import('@/layout/AppLayout');

const settingsGroupRoutes = [
  {
    path: '/configuracion',
    component: AppLayout,
    children: [
      ...chatSettingsRoutes,
    ]
  }
];

export default settingsGroupRoutes;
