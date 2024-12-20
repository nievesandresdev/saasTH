const AppLayout = () => import('@/layout/AppLayout');
const StaySetting = () => import('@/Modules/ReviewRequests/StaySetting');
const PostStaySetting = () => import('@/Modules/ReviewRequests/PostStaySetting');

const ReviewRequestSettings = [
  {
    path: '/webapp/solicitud-de-resenas',
    component: AppLayout,
    meta: { sidebar: 'SettingsMenu', sidebarWidth: '236px', sidebarRight: 'SidebarMockup' },  
    children: [
      {
        name: 'ReviewRequestSettingsIndex',
        path: 'in-stay',
        component: StaySetting
      },
      {
        name: 'ReviewRequestSettingsPostStay',
        path: 'post-stay',
        component: PostStaySetting
      },
    ],
  },
];

export default ReviewRequestSettings;
