const AppLayout = () => import('@/layout/AppLayout');

const comunicationHome = () => import('@/Modules/Comunication/ComunicationHome');

const comunicationRoutes = [
  {
    path: '/comunicacion',
    component: AppLayout,
    meta: { sidebar: 'SettingsMenu', sidebarWidth: '236px', requiresAuth: true },  
    children: [
        {
            name: 'ComunicationHome',
            path: '',
            component: comunicationHome
        },
    ]
  }
];

export default comunicationRoutes;
