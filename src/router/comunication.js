const AppLayout = () => import('@/layout/AppLayout');

const comunicationHome = () => import('@/Modules/Comunication/ComunicationHome');
const invitationByAirbnb = () => import('@/Modules/Comunication/InvitationByOtas/Airbnb');
const invitationByBooking = () => import('@/Modules/Comunication/InvitationByOtas/Booking');
const invitationByExpedia = () => import('@/Modules/Comunication/InvitationByOtas/Expedia');


const comunicationRoutes = [
  {
    path: '/comunicaciones',
    component: AppLayout,
    meta: { sidebar: 'SettingsMenu', sidebarWidth: '236px', requiresAuth: true },  
    children: [
        {
            name: 'ComunicationHome',
            path: '',
            component: comunicationHome
        },
        {
          path: 'invitacion-desde-ota',
          children: [
            {
                name: 'comunicationInvitationByBooking',
                path: 'booking',
                component: invitationByBooking
            },
            {
              name: 'comunicationInvitationByAirbnb',
              path: 'airbnb',
              component: invitationByAirbnb
            },
            {
              name: 'comunicationInvitationByExpedia',
              path: 'expedia',
              component: invitationByExpedia
            },
          ]
        }
    ]
  }
];

export default comunicationRoutes;
