const AppLayout = () => import('@/layout/AppLayout');

const comunicationHome = () => import('@/Modules/Comunication/ComunicationHome');

const invitationByAirbnb = () => import('@/Modules/Comunication/InvitationByOtas/Airbnb');
const invitationByBooking = () => import('@/Modules/Comunication/InvitationByOtas/Booking');
const invitationByExpedia = () => import('@/Modules/Comunication/InvitationByOtas/Expedia');

const FromPMS = () => import('@/Modules/Comunication/FromPMS');
const Signage = () => import('@/Modules/Comunication/Signage');
const FromQRTV = () => import('@/Modules/Comunication/FromQRTV');
const FromYourWeb = () => import('@/Modules/Comunication/FromYourWeb');

import PromoteWebapp from '@/Modules/Comunication/PromoteWebapp';

const comunicationRoutes = [
  {
    path: '/comunicaciones',
    component: AppLayout,
    meta: { sidebar: 'SettingsMenu', sidebarWidth: '236px', requiresAuth: true },  
    children: [
      {
        path: '',
        component: comunicationHome,
        name: 'ComunicationHome',
      }
    ]
  },
  {
    path: '/promociona-webapp',
    component: AppLayout,
    meta: { sidebar: 'SettingsMenu', sidebarWidth: '236px', requiresAuth: true },  
    children: [
        {
          path: '',
          component: PromoteWebapp,
          name: 'PromoteWebApp',
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
        },
        {
          name: 'ComunicationFromPMS',
          path: 'desde-tu-pms',
          component: FromPMS
        },
        {
          name: 'ComunicationSignage',
          path: 'senaletica',
          component: Signage
        },
        {
          name: 'ComunicationFromQRTV',
          path: 'codigo-qt-desde-tv',
          component: FromQRTV
        },
        {
          name: 'ComunicationFromYourWeb',
          path: 'desde-tu-web',
          component: FromYourWeb
        },
    ]
  },
];

export default comunicationRoutes;
