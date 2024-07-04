const PreStayPage = () => import('@/Modules/Queries/Settings/PreStayPage');
const StayPage = () => import('@/Modules/Queries/Settings/StayPage');
const PostStayPage = () => import('@/Modules/Queries/Settings/PostStayPage');

const querySettingsRoutes = [
  {
    path: 'webapp',
    meta: { sidebarRight: 'SidebarMockup'},  
    children: [
      {
        name: 'SettingsPreStayPage',
        path: 'pre-stay',
        component: PreStayPage
      },
      {
        name: 'SettingsStayPage',
        path: 'stay',
        component: StayPage
      },
      {
        name: 'SettingsPostStayPage',
        path: 'post-stay',
        component: PostStayPage
      },
    ],
  },
];

export default querySettingsRoutes;
