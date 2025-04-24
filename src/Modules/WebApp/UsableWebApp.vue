<template>
    <div class="relative min-h-screen flex items-center justify-center">
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
      <div class="relative z-10 container mx-auto px-4">
        <div class="grid grid-cols-12 gap-2">
          <!-- Column 1 -->
          <div class="grid-1 bg-white p-1 rounded-lg col-span-4">
            <!-- <h2 class="text-2xl font-bold mb-4 font-caveat">Grid 1</h2> -->
            <div class="flex flex-col gap-[64px]"> <!-- flex principal-->
                <div class="flex gap-4">
                    <img src="/assets/icons/phone.svg" alt="Phone icon" class="w-[64px] h-[64px] object-cover" />
                    <div class="flex flex-col gap-2">
                        <p class="text-[20px] font-medium">Visualiza aquí y navega en la WebApp de tu [hotel]</p>
                        <p class="text-[24px] font-normal font-caveat text-[#0B6357]">Tal y como la verán tus huéspedes!</p>
                    </div>
                </div>
                <div class="flex gap-4 items-end">
                    <img src="/assets/icons/warninggreen.svg" alt="Warning icon" class="w-[64px] h-[64px] object-cover" />
                    <div class="flex flex-col gap-2">
                        <p class="text-[24px] font-normal font-caveat text-[#0B6357]">Pssst! Un consejo...</p>
                        <p class="text-[20px] font-medium">No ves los cambios realizados? Asegúrate de haberlos guardado, y recarga esta página.</p>
                    </div>
                </div>
                <div class="flex gap-4 items-end">
                    <img src="/assets/icons/qr.svg" alt="QR icon" class="w-[64px] h-[64px] object-cover" />
                    <div class="flex flex-col gap-2">
                        <p class="text-[24px] font-normal font-caveat text-[#0B6357]">Accede desde tu móvil!</p>
                        <p class="text-[20px] font-medium">Escanea el código QR de la derecha con la cámara de tu móvil y accederás a la WebApp.</p>
                    </div>
                </div>
            </div>
          </div>
  
          <!-- Column 2 -->
          <div class="grid-2 bg-white p-6 rounded-lg shadow col-span-4">
            <h2 class="text-2xl font-bold mb-4">{{ iframeUrlUsable }}</h2>
            <!-- Add your content here -->
          </div>
  
          <!-- Column 3 -->
          <div class="grid-3 bg-white p-6 rounded-lg shadow col-span-4">
            <h2 class="text-2xl font-bold mb-4">Grid 3</h2>
            <!-- Add your content here -->
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed,onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useHotelStore } from '@/stores/modules/hotel';
  import { useMockupStore } from '@/stores/modules/mockup';
  const mockupStore = useMockupStore();

  const route = useRoute();
  const subdomain = route.params.subdomain;
  const hotelStore = useHotelStore();
  //const hotelData = hotelStore.hotelData;

  onMounted(async () => {
    const response = await hotelStore.$findByParams({subdomain: subdomain,stayDemo:true});
    mockupStore.$setIframeUrlUsable(response.hotel.chain.subdomain, response.hotel.subdomain);

    console.log(mockupStore.iframeUrlUsable,response.demo_stay);

  });

  //mockupStore.$setIframeUrl(subdomain,hotelStore.hotelData.language);
  

  const iframeUrlUsable = computed(() => mockupStore.iframeUrlUsable);
  
  //console.log(iframeUrlHosterPage.value);
  
  </script>
  
  <style scoped>
  .container {
    max-width: 1400px;
    width: 90%;
  }
  </style>
  
  
  