const HomePage = () => import('@/Modules/Stay/HomePage');

const stayGroupRoutes = [
  {
    path: '',
    children: [
      {
        name: 'StayHomePage',
        path: '',
        component: HomePage
      },
    ],
  },
];

export default stayGroupRoutes;
