import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createHead } from '@vueuse/head'
import Toast from "vue-toastification";
import 'vue-toastification/dist/index.css';

import VueClickAway from "vue3-click-away";



// estilos generales
import './assets/css/main.css';
import './utils/registerBaseComponents.js';

import { i18n } from './i18n';
import { pinia } from './stores';

// helpers
import { 
  $getRoleName ,
  $isAssociate,
  $isAdmin,
  $isOperator,
  $nameLanguage,
  $translatePeriod,
  $getPropertyInUrl,
  $formatTimestampDate,
  $formatTypeLodging,
  $formatNameLodging
} from '@/utils/helpers.js'

const head = createHead()

// Integrar el router en los stores de Pinia
pinia.use(({ store }) => {
  store.$router = router
})

function initializeApp() {
  const app = createApp(App)

  

  app.use(Toast)
  app.use(pinia)
  app.use(i18n)
  app.use(router)
  app.use(head)
  
  app.use(VueClickAway)
  
  //$getRoleName global
  app.config.globalProperties.$getRoleName = $getRoleName
  //$isAssociate global
  app.config.globalProperties.$isAssociate = $isAssociate
  //$isAdmin global
  app.config.globalProperties.$isAdmin = $isAdmin
  //$isOperator global
  app.config.globalProperties.$isOperator = $isOperator
  app.config.globalProperties.$nameLanguage = $nameLanguage
  app.config.globalProperties.$translatePeriod = $translatePeriod
  app.config.globalProperties.$getPropertyInUrl = $getPropertyInUrl
  app.config.globalProperties.$formatTimestampDate = $formatTimestampDate
  app.config.globalProperties.$formatTypeLodging = $formatTypeLodging
  app.config.globalProperties.$formatNameLodging = $formatNameLodging
  

  
  app.mount('#app')
}

initializeApp()
