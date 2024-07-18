const AppLayout = () => import('@/layout/AppLayout');
//stay

const HomePage = () => import('@/Modules/Stay/HomePage');
const DetailPage = () => import('@/Modules/Stay/DetailPage');

//queries
const StayQueryDetail = () => import('@/Modules/Stay/Queries/Detail');


const stayGroupRoutes = [
  {
    path: '/estancias',
    component: AppLayout,
    meta: { sidebar: 'StayList', sidebarWidth: '304px' },  
    children: [
      {
        name: 'StayHomePage',
        path: '',
        component: HomePage
      },
      {
        name: 'StayDetailPage',
        path: ':stayId',
        component: DetailPage,
        meta: { sidebarRight: 'SideStayFeedback'},  
        props: (route) => ({ paramsRouter: {...route.params} })
      },
      //
      //queries routes
      //
      {
        name: 'StayQueryDetail',
        path: ':stayId/feedback', // Usar '/' para separar parámetros
        component: StayQueryDetail,
        meta: { sidebarRight: 'SideStayFeedback' },
        props: (route) => ({ paramsRouter: {...route.params} })
      }
      
    ]
  }
];

export default stayGroupRoutes;
