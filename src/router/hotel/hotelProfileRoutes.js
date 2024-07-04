// chatSettingsRoutes.js
const ProfilePage = () => import('@/Modules/Hotel/ProfilePage');

const hotelProfileRoutes = [
  {
    path: 'perfil',
    meta: { sidebarRight: 'SidebarMockup'},  
    children: [
      {
        name: 'Perfil',
        path: '',
        component: ProfilePage
      },
    ],
  },
];

export default hotelProfileRoutes;
