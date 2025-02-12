const AppLayout = () => import('@/layout/AppLayout');
//stay

const HomePage = () => import('@/Modules/Stay/HomePage');
const DetailPage = () => import('@/Modules/Stay/DetailPage');

//queries
const StayQueryDetail = () => import('@/Modules/Stay/Queries/Detail');
//chat
const StayChatRoom = () => import('@/Modules/Stay/Chat/ChatRoom');

const CheckinDetail = () => import('@/Modules/Stay/Checkin/CheckinDetail');



const stayGroupRoutes = [
  {
    path: '/estancias',
    component: AppLayout,
    meta: { sidebar: 'StayList', sidebarWidth: '304px', componentOverContent: 'HeaderOfStaysContent' },  
    children: [
      {
        name: 'StayHomePage',
        path: '',
        component: HomePage,
        meta: { componentOverContent: null},
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
        path: ':stayId/feedback',
        component: StayQueryDetail,
        meta: { sidebarRight: 'SideStayFeedback' },
        props: (route) => ({ paramsRouter: {...route.params} })
      },
      //
      //chat routes
      //
      {
        name: 'StayChatRoom',
        path: ':stayId/chat',
        component: StayChatRoom,
        meta: { sidebarRight: 'SideStayFeedback' },
        props: (route) => ({ paramsRouter: {...route.params} })
      },
      {
        name: 'CheckinDetail',
        path: ':stayId/checkin',
        component: CheckinDetail,
        meta: { sidebarRight: 'SideStayFeedback' },
        props: (route) => ({ paramsRouter: {...route.params} })
      }
      
    ]
  }
];

export default stayGroupRoutes;
