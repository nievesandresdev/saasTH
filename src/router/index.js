import { createRouter, createWebHistory } from 'vue-router'
// Importaciones de las rutas específicas por módulo
import authRoutes from './authRoutes'
import dashboardRoutes from './dashboardRoutes'
//grupos de rutas
import chatGroupRoutes from './chat/chatGroupRoutes'
import userGroupRoutes from './user/userGroupRoutes'
// Importaciones de stores


// Utilidades generales y funciones
// import utils from '@/utils/utils.js' --> example

// Lazy loading de componentes con webpackChunkName que ayuda a agrupar los componentes compilados.
const NotFoundPage = () => import(/* webpackChunkName: "home" */ '@/shared/NotFoundPage.vue')

// Configuración de rutas
const routes = [
  ...authRoutes,
  ...dashboardRoutes,
  //grupos de rutas por modulo
  ...chatGroupRoutes,
  ...userGroupRoutes,
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage }, // Capturar todas las rutas no definidas
]

// Creación del router utilizando el modo historial del navegador
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {// Controla el comportamiento del desplazamiento de la página
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  }
  
})

// Guard global que se ejecuta antes de cada cambio de ruta
router.beforeEach(() => {
  //
});
export default router;