// chatSettingsRoutes.js
const ListPage = () => import('@/Modules/Facility/ListPage');

const hotelFacilityRoutes = [
  {
    path: 'instalaciones',
    meta: { sidebarRight: 'SidebarMockup'},  
    children: [
      {
        name: 'Facilities',
        path: '',
        component: ListPage
      },
    ],
  },
];

export default hotelFacilityRoutes;
