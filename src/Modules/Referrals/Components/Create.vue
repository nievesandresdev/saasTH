<template>
  <Transition>
    <div 
      v-if="isOpenSidePanel" 
      class="fixed z-[2000] bg-[#00000080] top-0 left-0 h-screen w-screen"
      @click="isOpenSidePanel = false"
    ></div>
  </Transition>
  
  <Transition name="slide">
    <div v-if="showSlidePanel" class="w-[500px] h-full bg-white fixed top-0 z-[5001] right-[354px] flex flex-col">
      <!-- Header -->
      <div class="flex justify-between items-center px-6 py-[20px] h-[64px] border-b border-[#BFBFBF]">
        <div class="flex-1 text-left">
          <h1 class="font-medium text-[22px]">Nuevo regalo para el referente</h1>
        </div>
        <div class="flex justify-end">
          <button class="">
            <img src="/assets/icons/1.TH.CLOSE.svg" alt="icon_close" class="w-8 h-8 hover:bg-[#F3F3F3] rounded-[100px] p-1">
          </button>
        </div>
      </div>
      
      <!-- Form -->
      <div class="flex-1 overflow-y-auto px-6 py-4">
        <!-- Aquí va tu formulario -->
        <form>
          <div class="mb-4">
             <RadioButton id="color-1" :value="'0'" v-model="isOpenSidePanel"/>
            <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
            <input id="name" type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input id="email" type="email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <!-- Agrega más campos aquí -->
        </form>
      </div>
      
      <!-- Footer -->
      <div class="py-4 px-6 border-t border-gray-300 bg-white">
        <div class="flex justify-between">
          <button  
            class="hbtn-tertiary text-sm font-medium underline"
          >
              Cancelar
          </button>
          <button
            class="px-4 py-2 font-medium rounded text-black"
            :disabled="isFormIncomplete"
            :class="isFormIncomplete ? 'bg-gray-300 text-gray-400' : 'hbtn-cta text-black '"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, inject, watch } from 'vue';
import RadioButton from '@/components/Forms/RadioButton.vue';

const showPanel = ref(false);
const showSlidePanel = ref(false);

const isOpenSidePanel = inject('isOpenSidePanel');

watch(
  () => isOpenSidePanel.value,
  (newVal) => {
    if (newVal) {
      setTimeout(() => {
        showPanel.value = isOpenSidePanel.value;
      }, 200);
      setTimeout(() => {
        showSlidePanel.value = isOpenSidePanel.value;
      }, 400);
    } else {
      setTimeout(() => {
        showSlidePanel.value = isOpenSidePanel.value;
      }, 200);
      setTimeout(() => {
        showPanel.value = isOpenSidePanel.value;
      }, 400);
    }
  }
);
</script>

<style scoped>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  .v-enter-to, .v-leave-from {
    opacity: 1;
  }

  .slide-leave-active,
  .slide-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(100%);
  }
</style>
