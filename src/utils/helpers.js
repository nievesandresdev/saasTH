import { useAuthStore } from '@/stores/modules/auth/login'
//import { createPinia, setActivePinia, getActivePinia } from 'pinia'

/*
 * inicializa pinia si no esta inicializado
*/
/* function ensurePinia() {
  try {
    getActivePinia();
  } catch {
    setActivePinia(createPinia());
  }
} */

/*
* retorna el nombre del rol
*/
const $getRoleName = (roleName) => {
    return roleName === 'Associate'
      ? 'Propietario'
      : roleName === 'Administrator'
      ? 'Administrador'
      : 'Operador';
};

const $isAssociate = () => {
    const authStore = useAuthStore();
    return authStore.user.role === 'Associate';
};

const $isAdmin = () => {
    const authStore = useAuthStore();
    return authStore.user.role === 'Administrator';
};

const $isOperator = () => {
    const authStore = useAuthStore();
    return authStore.user.role === 'Operator';
};

const $nameLanguage = (lang) => {
  switch (lang) {
    case 'es':
      return 'Español';
    case 'en':
      return 'Inglés';
    case 'fr':
      return 'Francés';
    default:
      return '--';
  }
}

export {
    $getRoleName,
    $isAssociate,
    $isAdmin,
    $isOperator,
    $nameLanguage
};
