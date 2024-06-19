import userSettingsRoutes from './userSettingsRoutes';


const AppLayout = () => import('@/layout/AppLayout');

const userGroupRoutes = [
  {
    path: '/usuarios',
    component: AppLayout,
    meta: { displayedMenu : true },  
    children: [
      ...userSettingsRoutes,
    ]
  }
];

export default userGroupRoutes;
