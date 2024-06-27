const IndexPage = () => import('@/Modules/ReviewRequests/Settings/IndexPage');

const ReviewRequestSettings = [
  {
    path: 'configuracion',
    meta: { sidebarRight: 'SidebarMockup'},  
    children: [
      {
        name: 'ReviewRequestSettingsIndex',
        path: '',
        component: IndexPage
      },
    ],
  },
];

export default ReviewRequestSettings;
