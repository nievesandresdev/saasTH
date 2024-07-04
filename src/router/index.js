import { createRouter, createWebHistory } from 'vue-router'
// Importaciones de las rutas específicas por módulo
import authRoutes from './authRoutes'
import dashboardRoutes from './dashboardRoutes'
//grupos de rutas
import hotelGroupRoutes from './hotel/hotelGroupRoutes'
import chatGroupRoutes from './chat/chatGroupRoutes'
import userGroupRoutes from './user/userGroupRoutes'
import reviewsRequestsGroupRoutes from './reviewRequests/reviewsRequestsGroupRoutes'
import queriesGroupRoutes from './queries/queriesGroupRoutes'
// Importaciones de stores

// Utilidades generales y funciones
// import utils from '@/utils/utils.js' --> example

function isAuthenticated() {
  const token = sessionStorage.getItem('token');
  return !!token;
}

// Lazy loading de componentes con webpackChunkName que ayuda a agrupar los componentes compilados.
const NotFoundPage = () => import(/* webpackChunkName: "home" */ '@/shared/NotFoundPage.vue')

// Configuración de rutas
const routes = [
  { path: '/', redirect: '/login' }, // Redirigir la raíz a /login
  ...authRoutes,
  ...dashboardRoutes,
  //grupos de rutas por modulo
  ...hotelGroupRoutes,
  ...chatGroupRoutes,
  ...userGroupRoutes,
  ...reviewsRequestsGroupRoutes,
  ...queriesGroupRoutes,
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage }, // Capturar todas las rutas no definidas
]

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
  
})

// Middleware de navegación
router.beforeEach((to, from, next) => {
  if (to.path === '/login' && isAuthenticated()) {
    next('/dashboard');
  } else if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated()) {
    next({ name: 'LoginPage' })
  } else {
    next();
  }
});
export default router;
