import { DateTime } from 'luxon';
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

const $getPropertyInUrl = (url, property) => {
  if (!url) return;
  const urlObj = new URL(url);
  const queryParams = new URLSearchParams(urlObj.search);
  return queryParams.get(property);
}

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
    return authStore.user?.role === 'Operator';
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
      return '-';
  }
}

const $translatePeriod = (period) => {
  switch (period) {
    case 'pre-stay':
      return 'pre-stay';
    case 'in-stay':
      return 'stay';
    case 'post-stay':
      return 'post-stay';
    case 'invalid-stay':
      return 'post-stay';
    default:
      return '';
  }
}

const $formatTimestampDate = (date, format = 'dd/MM/yyyy') => {
  if (!date) return "Fecha no disponible";

  const correctFormatDate = date.replace(" ", "T");
  const parsedDate = DateTime.fromISO(correctFormatDate);
  if (parsedDate.isValid) {
    return parsedDate.toFormat(format);
  } else {
    console.error("Fecha inválida proporcionada a Luxon:", date);
    return "Fecha inválida";
  }
};

const $urlBaseWebapp = () => {
  const GUEST_URL = process.env.VUE_APP_GUEST_URL;
  console.log('GUEST_URL helper',GUEST_URL)
  let subdomain = sessionStorage.getItem('current_subdomain');
  console.log('subdomain helper',subdomain)
  let urlBase = GUEST_URL.replace('subdomain', subdomain);
  console.log('urlBase helper',urlBase)
  return urlBase;
}

const $formatImage = (payload) => {
  const URL_STORAGE = process.env.VUE_APP_STORAGE_URL;
  let { url, type, urlDefault } = payload
  if (!url || !URL_STORAGE) return;
  if (urlDefault) return url;
  let type_d = url.includes('https://') ? 'CDN' : 'STORAGE'
  type = type ?? type_d
  if (type == 'CDN' || type == 'image-hotel-scraper') return url
  let path = URL_STORAGE+url
  return path
}

export {
    $getRoleName,
    $isAssociate,
    $isAdmin,
    $isOperator,
    $nameLanguage,
    $translatePeriod,
    $formatTimestampDate,
    $getPropertyInUrl,
    $urlBaseWebapp,
    $formatImage,
};
