import { createRouter, createWebHistory } from 'vue-router';
// Importaciones de las rutas específicas por módulo
import authRoutes from './authRoutes';
import dashboardRoutes from './dashboardRoutes';
// Grupos de rutas
import chatGroupRoutes from './chat/chatGroupRoutes';
import userGroupRoutes from './user/userGroupRoutes';
import reviewsRequestsGroupRoutes from './reviewRequests/reviewsRequestsGroupRoutes';
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

// Lazy loading de componentes con webpackChunkName que ayuda a agrupar los componentes compilados.
const NotFoundPage = () => import(/* webpackChunkName: "home" */ '@/shared/NotFoundPage.vue');

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
  ...authRoutes,
  ...dashboardRoutes,
  ...comunicationRoutes,
  // Grupos de rutas por módulo
  ...chatGroupRoutes,
  ...userGroupRoutes,
  ...reviewsRequestsGroupRoutes,
  ...queriesGroupRoutes,
  ...stayRoutes,
  ...hotelGroupRoutes,
  ...placeGroupRoutes,
  ...experienceGroupRoutes,
  ...galleryGroupRoutes,
  ...webAppRoutes,
  ...customizationRoutes,
  ...appearenceRoutes,
  ...reviewRoutes,
  ...legalTextGroupRoutes,
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
router.beforeEach((to, from, next) => {
  const isAuth = isAuthenticated();

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
