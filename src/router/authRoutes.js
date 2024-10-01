import LoginPage from '@/Modules/Auth/LoginPage.vue';
import ResetPassword from '@/Modules/Auth/ResetPassword.vue';
import SimulateLogout from '@/Modules/Auth/SimulateLogout.vue';

const authRoutes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/simulateLogout',
    name: 'SimulateLogout',
    component: SimulateLogout
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: ResetPassword,
    props: route => ({ token: route.params.token, email: route.query.email })
  }
];

export default authRoutes;
