import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { createHead } from '@vueuse/head'

import './assets/css/style.css'; 
import './assets/css/custom.css'; 
import './assets/css/buttons.css'; 
import './assets/css/inputs.css'; 
import './assets/css/colors.css';
//estilos generales
import './assets/css/main.css'


//estilos generales
import './assets/css/main.css'


const app = createApp(App);

import './assets/css/tailwind.css';

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