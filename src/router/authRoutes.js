import LoginPage from '@/Modules/Auth/LoginPage.vue';
import ResetPassword from '@/Modules/Auth/ResetPassword.vue';


const authRoutes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: ResetPassword,
    props: route => ({ token: route.params.token, email: route.query.email })
  }
];

export default authRoutes;
