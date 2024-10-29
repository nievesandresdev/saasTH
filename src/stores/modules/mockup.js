import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import { $urlBaseWebapp } from '@/utils/helpers';

import { useHotelStore } from '@/stores/modules/hotel';

export const useMockupStore = defineStore('mockupStore', () => {

  const hotelStore = useHotelStore();

  const GUEST_URL = process.env.VUE_APP_GUEST_URL
  const ENVIROMENT = process.env.VUE_APP_ENVIROMENT
  const iframeUrlRef = ref(null);
  const infoText1Ref = ref(null);
  const languageRef = ref(null);
  const infoTextIcon1Ref = ref(null);

  function $setIframeUrl(uri, params = 'test=x',lang = 'es') {
      let subdomain = hotelStore?.hotelData?.chain?.subdomain;
      let urlBase = $urlBaseWebapp();
      console.log(urlBase, 'urlBase');
      // console.log(subdomain)
      // if(ENVIROMENT == 'test'){
      //   urlBase = `https://${subdomain}.test.thehoster.io/webapp`;
      // }
      let completeURL =urlBase+`${uri}?subdomain=${subdomain}&lang=${lang}&mockup=true&${params}`;
      iframeUrlRef.value = completeURL;
  }

  function $reloadIframe() {
      const currentUrl = iframeUrlRef.value;
      iframeUrlRef.value = '';
      setTimeout(() => {
          iframeUrlRef.value = currentUrl;
      }, 100);
  }

  function $setInfo1(text, iconUrl) {
      infoText1Ref.value = text;
      infoTextIcon1Ref.value = iconUrl;
  }

  function $setLanguageTooltip(show = false){
    languageRef.value = show;
  }
  
  function $resetStore() {
    iframeUrlRef.value = null;
    infoText1Ref.value = null;
    languageRef.value = null;
    infoTextIcon1Ref.value = null;
  }

  const iframeUrl = computed(() => iframeUrlRef.value);
  const infoText1 = computed(() => infoText1Ref.value);
  const infoTextIcon1 = computed(() => infoTextIcon1Ref.value);
  const setLanguage = computed(() => languageRef.value);


  return {
    iframeUrl,
    $setIframeUrl,
    infoText1,
    infoTextIcon1,
    $setInfo1,
    $reloadIframe,
    $setLanguageTooltip,
    setLanguage,
    $resetStore
  };
});
