import { DateTime } from 'luxon';
import { useAuthStore } from '@/stores/modules/auth/login'
import { useHotelStore } from '@/stores/modules/hotel'

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
  const languages = {
    'es':'Español',
    'en':'Inglés',
    'fr':'Francés',
    'pt':'Portugués',
    'zh':'Chino',
    'hi':'Hindi',
    'ar':'Árabe',
    'bn':'Bengalí',
    'ru':'Ruso',
    'ja':'Japonés',
    'de':'Alemán',
    'ko':'Coreano',
    'tr':'Turco',
    'it':'Italiano',
    'pl':'Polaco',
    'uk':'Ucraniano',
    'ro':'Rumano',
    'nl':'Holandés',
    'id':'Indonesio',
    'vi':'Vietnamita',
    'th':'Tailandés',
    'sv':'Sueco',
    'el':'Griego',
    'cs':'Checo',
    'da':'Danés',
    'fi':'Finés',
    'hu':'Húngaro',
    'no':'Noruego',
    'sk':'Eslovaco'
  }
  let result = 'Desconocido';
  if(lang && languages[lang]){
    result = languages[lang];
  }
  return result
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

const $urlBaseWebapp = (subdomainChain, slugHotel, typeChain) => {
  const GUEST_URL = process.env.VUE_APP_GUEST_URL;
  let urlBase = GUEST_URL.replace('subdomain', subdomainChain).replace('webapp', slugHotel);
  
  
  // Reemplazar el dominio .io por .app
  urlBase = urlBase.replace('.io', '.app');
   console.log(urlBase, typeChain);

  return urlBase;
};


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

const $formatNameLodging = (valueType) => {
  
  const typeLodging = {
    hotel: "Hotel",
    hostal: "Hostal",
    pensión: "Pensión",
    ca: "Complejo de apartamentos",
    at: "Apartamento turístico",
    vft: "Vivienda con fines turísticos",
  }
  return typeLodging?.[valueType] ?? null;
}

const $formatTypeLodging = (title = false) => { 
  
  const hotelStore = useHotelStore();
  const typeLodging = {
    hotel: !title ? "hotel" : "Hotel",
    hostal: !title ? "hostal" : "Hostal",
    at: !title ? "apartamento" : "Apartamento",
    vft: !title ? "apartamento" : "Apartamento",
  }
  let defaultLetter = !title ? "hotel" : "Hotel";

  return typeLodging?.[hotelStore.hotelData?.type.toLowerCase()] ?? defaultLetter;
}

function $throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function() {
      const context = this;
      const args = arguments;
      if (!lastRan) {
          func.apply(context, args);
          lastRan = Date.now();
      } else {
          clearTimeout(lastFunc);
          lastFunc = setTimeout(function() {
              if ((Date.now() - lastRan) >= limit) {
                  func.apply(context, args);
                  lastRan = Date.now();
              }
          }, limit - (Date.now() - lastRan));
      }
  }
}

function $isElementVisible(el) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
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
    $formatTypeLodging,
    $formatNameLodging,
    $throttle,
    $isElementVisible
};
