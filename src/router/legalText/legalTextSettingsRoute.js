// legalTextSettingsRoute.js
const GeneralLegal = () => import('@/Modules/Legal/GeneralLegal');
const PoliciesLegal = () => import('@/Modules/Legal/PoliciesLegal');
const PolicyPrivacyLegal = () => import('@/Modules/Legal/PolicyPrivacyLegal.vue');
const PolicyCookiesLegal = () => import('@/Modules/Legal/PolicyCookiesLegal.vue');


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
      {
        name: 'PolicyPrivacyLegal',
        path: 'privacidad',
        component: PolicyPrivacyLegal
      },
      {
        name: 'PolicyCookiesLegal',
        path: 'cookies',
        component: PolicyCookiesLegal
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
