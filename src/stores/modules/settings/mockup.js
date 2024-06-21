import { defineStore } from 'pinia';
import { ref, computed } from 'vue'

export const useMockupStore = defineStore('mockupStore', () => {
  const iframeUrlRef = ref(null);
  const infoText1Ref = ref(null);
  const infoTextIcon1Ref = ref(null);

  function $setIframeUrl(link) {
      console.log('Updating iframeUrl:', link)
      iframeUrlRef.value = link + '&mockup=true';
  }

  function $setInfo1(text, iconUrl) {
      console.log('Updating infoText1:', text);
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
