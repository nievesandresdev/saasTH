<template>
    <div class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background elements -->
      <div class="absolute inset-0 z-0 pointer-events-none">
        <!-- Top image -->
        <div class="absolute top-0 left-0 w-full h-[200px]">
          <img src="/assets/img/GuardaPNG.png" alt="Top gradient" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-l from-white"></div>
        </div>
  
        <!-- Bottom image -->
        <div class="absolute bottom-0 left-0 w-full h-[200px]">
          <img src="/assets/img/GuardaPNG.png" alt="Bottom gradient" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-r from-white"></div>
        </div>
      </div>
  
      <!-- Main content with 3-column grid -->
      <div class="relative z-10 w-full max-w-[1400px] mx-auto px-2 sm:px-4">
        <div class="grid grid-cols-12 gap-2 items-center">
          <!-- Column 1 -->
          <div class="grid-1 bg-white p-1 rounded-lg col-span-4 mt-8">
            <!-- <h2 class="text-2xl font-bold mb-4 font-caveat">Grid 1</h2> -->
            <div class="flex flex-col gap-4 sm:gap-[64px]">
                <div class="flex gap-2 sm:gap-4">
                    <img src="/assets/icons/phone.svg" alt="Phone icon" class="w-[48px] h-[48px] sm:w-[64px] sm:h-[64px] object-cover" />
                    <div class="flex flex-col gap-1 sm:gap-2">
                        <p class="text-[16px] sm:text-[20px] font-medium">Visualiza aquí y navega en la WebApp de tu {{ hotelData.type == 'hotel' ? 'Hotel' : hotelData.type }}</p>
                        <p class="text-[20px] sm:text-[24px] font-normal font-caveat text-[#0B6357]">Tal y como la verán tus huéspedes!</p>
                    </div>
                </div>
                <div class="flex gap-2 sm:gap-4 items-end">
                    <img src="/assets/icons/warninggreen.svg" alt="Warning icon" class="w-[48px] h-[48px] sm:w-[64px] sm:h-[64px] object-cover" />
                    <div class="flex flex-col gap-1 sm:gap-2">
                        <p class="text-[20px] sm:text-[24px] font-normal font-caveat text-[#0B6357]">Pssst! Un consejo...</p>
                        <p class="text-[16px] sm:text-[20px] font-medium">No ves los cambios realizados? Asegúrate de haberlos guardado, y recarga esta página.</p>
                    </div>
                </div>
                <div class="flex gap-2 sm:gap-4 items-end">
                    <img src="/assets/icons/qr.svg" alt="QR icon" class="w-[48px] h-[48px] sm:w-[64px] sm:h-[64px] object-cover" />
                    <div class="flex flex-col gap-1 sm:gap-2">
                        <p class="text-[20px] sm:text-[24px] font-normal font-caveat text-[#0B6357]">Accede desde tu móvil!</p>
                        <p class="text-[16px] sm:text-[20px] font-medium">Escanea el código QR de la derecha con la cámara de tu móvil y accederás a la WebApp.</p>
                    </div>
                </div>
            </div>
          </div>
  
          <!-- Column 2 -->
          <div class="grid-2 bg-white p-2 sm:p-6 col-span-4">
            <div class="flex flex-col items-center justify-center">
              <div id="mockup" class="relative h-[632px] w-[412px]">
                <div id="content-mockup" class="hbg-gray-100 absolute z-[49] top-[15px] left-[42px] overflow-hidden !rounded-[36px]">
                  <iframe 
                    class="w-full h-full border-none" 
                    :src="iframeUrlUsable"
                    frameborder="0">
                    Tu navegador no soporta iframes, por favor actualiza a una versión más reciente.
                  </iframe>
                </div>
                <img class="w-[412px] h-[732px] absolute left-0 top-0 z-50 pointer-events-none" src="/assets/img/mockup-black.svg" alt="">
              </div>
            </div>
          </div>
  
          <!-- Column 3 -->
          <div class="grid-3 bg-white p-2 sm:p-6 col-span-4">
            <div class="flex flex-col items-center justify-center">
              <div class="mb-8">
                <p class="text-[41px] font-semibold text-center">{{ hotelData.type == 'hotel' ? 'Hotel' : hotelData.type }}</p>
                <p class="text-[41px] font-semibold text-center">{{ hotelData.name }}</p>
              </div>
              <div class="mt-8 flex justify-center">
                <div v-if="isLoading" class="flex items-center justify-center">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
                <div v-else class="border border-[#BFBFBF] rounded-[20px] p-[4px]">
                  <QRCodeVue3 
                    :value="iframeUrlUsable"
                    :width="300"
                    :height="300"
                    :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
                    :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
                    :dotsOptions="{
                      type: 'square',
                      color: '#333',
                      gradient: {
                        type: 'linear',
                        rotation: 0,
                        colorStops: [
                          { offset: 0, color: '#333' },
                          { offset: 1, color: '#333' },
                        ],
                      },
                    }"
                    :backgroundOptions="{ color: '#ffffff' }"
                    :cornersSquareOptions="{ type: 'dot', color: '#333' }"
                    :cornersDotOptions="{ type: undefined, color: '#333' }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed,onMounted,ref } from 'vue';
  import QRCodeVue3 from "qrcode-vue3";
  import { useRoute } from 'vue-router';
  import { useHotelStore } from '@/stores/modules/hotel';
  import { useMockupStore } from '@/stores/modules/mockup';
  import { $urlBaseWebapp } from '@/utils/helpers';

  const mockupStore = useMockupStore();
  const route = useRoute();
  const subdomain = route.params.subdomain;
  const hotelStore = useHotelStore();
  const hotelData = ref({})
  //const urlQrCode = ref('');
  const isLoading = ref(true);

  onMounted(async () => {
    try {
      const response = await hotelStore.$findByParams({subdomain: subdomain,stayDemo:true});
      mockupStore.$setIframeUrlUsable(response.hotel.chain.subdomain, response.hotel.subdomain,`e=${response.demo_stay.stay_id}&g=${response.demo_stay.guest_id}`);
      hotelData.value = response.hotel;
      //urlQrCode.value = $urlBaseWebapp(response.hotel.chain.subdomain, response.hotel.subdomain);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      isLoading.value = false;
    }
  });

  //mockupStore.$setIframeUrl(subdomain,hotelStore.hotelData.language);
  

  const iframeUrlUsable = computed(() => mockupStore.iframeUrlUsable);
  
  //console.log(iframeUrlHosterPage.value);
  
  </script>
  
  <style scoped>
  .container {
    max-width: 1400px;
    width: 100%;
  }

  #mockup {
    cursor: inherit;
    min-width: 412px;
    min-height: 732px;
  }

  #content-mockup {
    border-radius: 36px;
    height: 700px;
    width: 327px;
    box-shadow: 0 4px 14px rgba(0,0,0,0.3);
    background-color: black;
  }
  </style>
  
  
  