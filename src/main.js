import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { createHead } from '@vueuse/head'

//estilos generales
import './assets/css/main.css'


const app = createApp(App);

import { i18n }  from './i18n'
import { pinia } from './stores';

const head = createHead()

function initializeApp () {
    const app = createApp(App);

    app.use(pinia)
    app.use(i18n)
    app.use(router)
    app.use(head)
    app.mount('#app')

}

initializeApp()