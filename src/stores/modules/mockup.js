import { defineStore } from 'pinia';
import { ref, computed } from 'vue'

export const useMockupStore = defineStore('mockupStore', () => {

  const GUEST_URL = process.env.VUE_APP_GUEST_URL
  const ENVIROMENT = process.env.VUE_APP_ENVIROMENT
  const iframeUrlRef = ref(null);
  const infoText1Ref = ref(null);
  const infoTextIcon1Ref = ref(null);

  function $setIframeUrl(uri, params = 'test=null') {
      let subdomain = sessionStorage.getItem('current_subdomain');
      let urlBase = GUEST_URL;
      if(ENVIROMENT == 'test'){
        urlBase = `https://${subdomain}.test.thehoster.io/webapp`;
      }
      let completeURL =urlBase+`${uri}?subdomain=${subdomain}&mockup=true&${params}`
      iframeUrlRef.value = completeURL;
  }

  function $setInfo1(text, iconUrl) {
      infoText1Ref.value = text;
      infoTextIcon1Ref.value = iconUrl;
  }

  const iframeUrl = computed(() => iframeUrlRef.value);
  const infoText1 = computed(() => infoText1Ref.value);
  const infoTextIcon1 = computed(() => infoTextIcon1Ref.value);


  return {
    iframeUrl,
    $setIframeUrl,
    infoText1,
    infoTextIcon1,
    $setInfo1
  };
});
