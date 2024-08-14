// legalTextSettingsRoute.js
const GeneralLegal = () => import('@/Modules/Legal/GeneralLegal');
const PoliciesLegal = () => import('@/Modules/Legal/PoliciesLegal');
const AutomaticResponses = () => import('@/Modules/Chat/Settings/AutomaticResponses');

const legalTextSettingsRoute = [
  {
    path: '',
    meta: {requiresAuth: true},  
    children: [
      {
        name: 'GeneralLegal',
        path: 'general',
        component: GeneralLegal
      },
      {
        name: 'PoliciesLegal',
        path: 'politicas',
        component: PoliciesLegal
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
