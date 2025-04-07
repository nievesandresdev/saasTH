<template>
    <!-- <div class="fixed z-[10000] bg-red-200 top-0 left-0">{{ initialImageIndex }}</div> -->
    <div v-if="isPreviewOpen" class="fixed inset-0 bg-[#16161680] z-[3000] flex items-center justify-center" @click="closePreview">
        <button class="fixed top-6 right-6 bg-white rounded-full p-1">
            <img class="w-[32px] h-[32px]" src="/assets/icons/1.TH.CLOSE.svg" alt="">
        </button>
        <button class="fixed left-6 bg-white rounded-full p-1" @click.stop="prevImage" v-if="currentIndex > 0">
            <img class="w-[32px] h-[32px]" src="/assets/icons/1.TH.BACK.svg" alt="">
        </button>
        <button class="fixed right-6 bg-white rounded-full p-1" @click.stop="nextImage"  v-if="currentIndex < (images.length-1)">
            <img class="w-[32px] h-[32px]" src="/assets/icons/1.TH.BACK.RIGHT.svg" alt="">
        </button>
        
        <div class="max-w-[50vw] max-h-[80vh] relative">
  <!-- Imagen con tamaño natural -->
  <img 
    :src="hotelStorage.formatImage(currentImage)"
    alt="Imagen grande"
    class="w-full h-auto max-h-[80vh] object-contain rounded-t-[6px]"
  />
  
  <!-- Contenedor del nombre de la imagen -->
  <div class="bg-white px-4 py-2 rounded-b-[6px] max-w-full absolute left-0 bottom-[-39px]">
    <p class="text-base font-medium leading-[140%] truncate w-full overflow-hidden text-ellipsis">
      {{ currentImage.name }}
    </p>
  </div>
</div>

    </div>
  </template>
  
  <script setup>
  import { ref, computed, watchEffect, inject } from 'vue';
  import { useHotelStore } from '@/stores/modules/hotel';
    const hotelStorage = useHotelStore();

  const props = defineProps({
    images: {
      type: Array,
      required: true
    },
    initialImageIndex: {
      type: Number,
      default: 0
    }
  });
  
  const isPreviewOpen = inject('isPreviewOpen');
  const currentIndex = ref(props.initialImageIndex);
  
  const currentImage = computed(() => {
    console.log('test props.images',props.images)
    console.log('test 0',props.images[Number(currentIndex.value)])
    return props.images[Number(currentIndex.value)]
  });
  
  const closePreview = () => {
    isPreviewOpen.value = false;
  };
  
  const prevImage = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--;
    }
  };
  
  const nextImage = () => {
    if (currentIndex.value < props.images.length - 1) {
      currentIndex.value++;
    }
  };
  
  watchEffect(() => {
    currentIndex.value = props.initialImageIndex; // Reset to initial image if prop changes
  });
  </script>
  
  <style scoped>
  /* Agregar estilos para el preview de imagen */
  </style>
  