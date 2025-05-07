// contactRoutes.js
const AppLayout = () => import('@/layout/AppLayout');

const ContactPhones = () => import('@/Modules/HotelContact/Phones');
const ContactWhatsapp = () => import('@/Modules/HotelContact/Whatsapp');
const ContactEmail = () => import('@/Modules/HotelContact/Email');

const hotelProfileRoutes = [
  {
    path: '/webapp/contacto',
    component: AppLayout,
    meta: { sidebar: 'SettingsMenu', sidebarWidth: '236px', requiresAuth: true, sidebarRight: 'SidebarMockup' },  
    children: [
      {
        name: 'ContactPhones',
        path: 'telefonos',
        component: ContactPhones
      },
      {
        name: 'ContactWhatsapp',
        path: 'whatsapp',
        component: ContactWhatsapp
      },
      {
        name: 'ContactEmail',
        path: 'email',
        component: ContactEmail
      },
      
    ],
  },
];

export default hotelProfileRoutes;
