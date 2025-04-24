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
        <div class="grid grid-cols-3 gap-8">
          <!-- Column 1 -->
          <div class="grid-1 bg-white p-6 rounded-lg shadow">
            <h2 class="text-2xl font-bold mb-4">Grid 1</h2>
            <!-- Add your content here -->
          </div>
  
          <!-- Column 2 -->
          <div class="grid-2 bg-white p-6 rounded-lg shadow">
            <h2 class="text-2xl font-bold mb-4">Grid 2</h2>
            <!-- Add your content here -->
          </div>
  
          <!-- Column 3 -->
          <div class="grid-3 bg-white p-6 rounded-lg shadow">
            <h2 class="text-2xl font-bold mb-4">Grid 3</h2>
            <!-- Add your content here -->
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useHotelStore } from '@/stores/modules/hotel';

  import { useMockupStore } from '@/stores/modules/mockup';
  const mockupStore = useMockupStore();

  const route = useRoute();
  const subdomain = route.params.subdomain;
  const hotelStore = useHotelStore();
  //const hotelData = hotelStore.hotelData;

  //mockupStore.$setIframeUrl(subdomain,hotelStore.hotelData.language);
  mockupStore.$setIframeUrl('/','',hotelStore.hotelData.language,false);

  const iframeUrlHosterPage = computed(() => mockupStore.iframeUrl);
  
  console.log(iframeUrlHosterPage.value);
  
  </script>
  
  <style scoped>
  .container {
    max-width: 1400px;
    width: 90%;
  }
  </style>
  
  
  