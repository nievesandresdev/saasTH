// legalTextSettingsRoute.js
const GeneralLegal = () => import('@/Modules/Legal/GeneralLegal');
const AvailabilitySettings = () => import('@/Modules/Chat/Settings/AvailabilitySettings');
const AutomaticResponses = () => import('@/Modules/Chat/Settings/AutomaticResponses');

const legalTextSettingsRoute = [
  {
    path: 'legal',
    meta: {requiresAuth: true},  
    children: [
      {
        name: 'GeneralLegal',
        path: 'general',
        component: GeneralLegal
      },
     /*  {
        name: 'AvailabilitySettings',
        path: 'availability',
        component: AvailabilitySettings
      },
      {
        name: 'AutomaticResponses',
        path: 'automatic-responses',
        component: AutomaticResponses
      }, */
      
    ],
  },
];

export default legalTextSettingsRoute;
