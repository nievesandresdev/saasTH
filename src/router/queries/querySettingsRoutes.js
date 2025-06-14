const PreStayPage = () => import('@/Modules/Settings/Queries/PreStayPage');
// const StayPage = () => import('@/Modules/Settings/Queries/StayPage');
// const PostStayPage = () => import('@/Modules/Settings/Queries/PostStayPage');
const StayVeryGoodPage = () => import('@/Modules/Settings/Queries/StayVeryGoodPage');
const StayGoodPage = () => import('@/Modules/Settings/Queries/StayGoodPage');
const StayNormalPage = () => import('@/Modules/Settings/Queries/StayNormalPage');
//
const PostStayVeryGoodPage = () => import('@/Modules/Settings/Queries/PostStayVeryGoodPage');
const PostStayGoodPage = () => import('@/Modules/Settings/Queries/PostStayGoodPage');
const PostStayNormalPage = () => import('@/Modules/Settings/Queries/PostStayNormalPage');
//
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
      //stay
      {
        name: 'SettingsStayVeryGoodPage',
        path: 'stay/muy-bueno',
        component: StayVeryGoodPage
      },
      {
        name: 'SettingsStayGoodPage',
        path: 'stay/bueno',
        component: StayGoodPage
      },
      {
        name: 'SettingsStayNormalPage',
        path: 'stay/normal',
        component: StayNormalPage
      },
      //post-stay
      {
        name: 'SettingsPostStayVeryGoodPage',
        path: 'post-stay/muy-bueno',
        component: PostStayVeryGoodPage
      },
      {
        name: 'SettingsPostStayGoodPage',
        path: 'post-stay/bueno',
        component: PostStayGoodPage
      },
      {
        name: 'SettingsPostStayNormalPage',
        path: 'post-stay/normal',
        component: PostStayNormalPage
      },

      //
      // {
      //   name: 'SettingsStayPage',
      //   path: 'stay',
      //   component: StayPage
      // },
      // {
      //   name: 'SettingsPostStayPage',
      //   path: 'post-stay',
      //   component: PostStayPage
      // },
    ],
  },
];

export default querySettingsRoutes;
