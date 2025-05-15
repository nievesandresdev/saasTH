import { createRouter, createWebHistory } from 'vue-router';
// Importaciones de las rutas específicas por módulo
import authRoutes from './authRoutes';
import dashboardRoutes from './dashboardRoutes';
// Grupos de rutas
import chatGroupRoutes from './chat/chatGroupRoutes';
import userGroupRoutes from './user/userGroupRoutes';
import ReviewRequestsSettingsRoutes from './reviewRequestsSettingsRoutes';
import queriesGroupRoutes from './queries/queriesGroupRoutes';
import stayRoutes from './stayRoutes';
// Routes config webapp
import hotelGroupRoutes from './hotel/hotelGroupRoutes';
import placeGroupRoutes from './placeRoutes';
import experienceGroupRoutes from './experienceRoutes';
import galleryGroupRoutes from './galleryRoutes';
import webAppRoutes from './webAppRoutes';
import customizationRoutes from './customizationRoutes';
import appearenceRoutes from './appearenceRoutes';
import legalTextGroupRoutes from './legalText/legalTextGroupRoutes';
import reviewRoutes from './reviewRoutes'
import comunicationRoutes from './comunication'
import serviceRoutes from './serviceRoutes'
import settingsCheckinRoutes from './settings/settingsCheckinRoutes.js';
import marketplaceRoutes from './marketplaceRoutes';
import contactRoutes from './hotel/contactRoutes';


// Lazy loading de componentes con webpackChunkName que ayuda a agrupar los componentes compilados.
const NotFoundPage = () => import(/* webpackChunkName: "home" */ '@/shared/NotFoundPage.vue');

//stores
import { useAuthStore } from '@/stores/modules/auth/login';

// Función para verificar si los datos críticos existen en localStorage
function isAuthenticated() {
  const token = localStorage.getItem('token');
  const current_subdomain = localStorage.getItem('current_subdomain');
  const user = localStorage.getItem('user');
  const current_hotel = localStorage.getItem('current_hotel');

  return !!token && !!current_subdomain && !!user && !!current_hotel;
}

// Configuración de rutas
const routes = [
  { path: '/', redirect: '/login' }, // Redirigir la raíz a /login
  { path: '/:subdomain', name: 'WebAppUsable', component: () => import(/* webpackChunkName: "subdomain" */ '@/Modules/WebApp/UsableWebApp.vue') },
  ...authRoutes,
  ...dashboardRoutes,
  ...comunicationRoutes,
  // Grupos de rutas por módulo
  ...chatGroupRoutes,
  ...userGroupRoutes,
  ...ReviewRequestsSettingsRoutes,
  ...queriesGroupRoutes,
  ...stayRoutes,
  ...hotelGroupRoutes,
  ...placeGroupRoutes,
  ...experienceGroupRoutes,
  ...serviceRoutes,
  ...galleryGroupRoutes,
  ...webAppRoutes,
  ...customizationRoutes,
  ...appearenceRoutes,
  ...reviewRoutes,
  ...legalTextGroupRoutes,
  ...settingsCheckinRoutes,
  ...marketplaceRoutes,
  ...contactRoutes,
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage }, // Capturar todas las rutas no definidas
];

// Creación del router utilizando el modo historial del navegador
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) { // Controla el comportamiento del desplazamiento de la página
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  }
});

// Middleware de navegación auth
router.beforeEach(async (to, from, next) => {
  /*
  esto sirve para inciar sesion a cualquier url con un codigo de usuario
  */ 
  const authStore = useAuthStore();
  if(to.query?.redirect == 'view' && to.query.code){
    const toQueryWithout = { ...to.query };
    delete toQueryWithout.redirect;
    delete toQueryWithout.code;
    await authStore.$loginByCode(to.query.code);
    return next({ path: to.path, query: toQueryWithout });
  }

  const isAuth = isAuthenticated();

  // Permitir acceso a la ruta de subdominio sin autenticación
  if (to.name === 'Subdomain') {
    return next();
  }

  // Evita que el middleware afecte la ruta de restablecimiento de contraseña
  if (to.name === 'ResetPassword') {
    return next();
  }

  if (!isAuth && to.path !== '/login') {
    localStorage.setItem('redirectTo', to.fullPath);
    return next('/login');
  }
  

  if (isAuth && to.path === '/login' && !to.query.token) { //esto es para que el middleware no afecte el login desde admin
    const redirectTo = localStorage.getItem('redirectTo') || '/dashboard';
    localStorage.removeItem('redirectTo'); 
    return next(redirectTo);
  }

  if (to.path === '/login' && to.query.token) {
    return next();
  }

  if (isAuth && localStorage.getItem('redirectTo') && to.path === '/dashboard') {
    const redirectTo = localStorage.getItem('redirectTo') || '/dashboard';
    localStorage.removeItem('redirectTo'); 
    return next(redirectTo);
  }

  next();
});




export default router;
