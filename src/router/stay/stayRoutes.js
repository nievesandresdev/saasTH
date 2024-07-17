const HomePage = () => import('@/Modules/Stay/HomePage');
const DetailPage = () => import('@/Modules/Stay/DetailPage');

const stayGroupRoutes = [
  {
    path: '',
    children: [
      {
        name: 'StayHomePage',
        path: '',
        component: HomePage
      },
      {
        name: 'StayDetailPage',
        path: ':id',
        component: DetailPage,
        meta: { sidebarRight: 'SideStayFeedback'},  
        props: (route) => ({ paramsRouter: {...route.params} })
      },
    ],
  },
];

export default stayGroupRoutes;
