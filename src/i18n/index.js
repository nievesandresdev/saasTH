
import { createI18n } from 'vue-i18n';


import HomeEs from './es/home';

const messages = {
  
  es: {
    home: HomeEs,
    // más módulos...
  },
  
};

// Configuración de i18n
const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages,
});

export { i18n };
