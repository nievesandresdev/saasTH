<template>
    <transition>
      <div
        v-if="modalShow"
        class="absolute bg-white shadow-xl add flex-column"
        :style="`top: ${containerTop}px; right: 0; min-height: calc(100vh - ${containerTop}px); height: calc(100vh - ${containerTop}px); z-index: 700;`"
        ref="ref_section_show"
      >
        <div class="overflow-y-auto scrolling-sticky" style="height: calc(100% - 72px)">
          <div class="flex justify-between items-center px-6 py-5">
            <div class="text-center">
              <h1 class="font-[500] text-[22px]">Ver norma</h1>
            </div>
            <div class="flex justify-end">
              <button @click="closeModal">
                <img src="/assets/icons/1.TH.CLOSE.svg" alt="icon_close" class="w-6 h-6 hover:bg-[#F3F3F3] rounded-full p-1">
              </button>
            </div>
          </div>
          <hr class="mb-1">
          <div class="py-3 px-6">
            <p class="font-medium text-[18px] mt-6 mb-2">{{ data.title }}</p>
            <p class="font-medium text-sm mb-6">{{ data.description }}</p>
            <section v-show="data.penalization">
                <p class="font-semibold text-[16px] mb-2">Penalización</p>
                <p class="font-medium text-sm">{{ data.penalization_details }}</p>
            </section>
          </div>
        </div>
        <div 
          class="tertiary-black-200 py-4 px-6 flex items-center justify-between border-t border-gray z-[1000] bg-white w-full" 
          style="height: 72px;" 
        >
          <button class="underline font-medium" @click="deletePolicy">
            Eliminar
          </button>
          <button
            class="hbtn-cta px-4 py-3 font-medium rounded-[6px] leading-[110%]"
            @click="editPolicy"
          >
            Editar
          </button>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
import { ref, onMounted, defineEmits, defineProps } from 'vue';

const emits = defineEmits(['close','edit','delete','toEdit']);
const props = defineProps({
    modalShow: Boolean,
    data: Object
});

const closeModal = () => {
    emits('close');
};

const editPolicy = () => {
    closeModal();
    emits('edit', props.data,true);
};

const deletePolicy = () => {
    closeModal();
    emits('delete', props.data);
};

const containerTop = ref(0);
const ref_section_show = ref(null);

onMounted(() => {
    const sectionExpElement = document.getElementById('layout-hoster');
    if (sectionExpElement) {
        containerTop.value = sectionExpElement.offsetTop;
    }
});

</script>

  
  
  
  
  
<style lang="scss">
  .add {
      width: 500px;
      position: fixed;
  }
  
  .v-enter-active, .v-leave-active {
      transition: transform 0.5s ease;
  }
  
  .v-enter-from, .v-leave-to {
      transform: translateX(100%);
  }
  
  .scrolling-sticky {
      &::-webkit-scrollbar {
          -webkit-appearance: none;
      }
    
      &::-webkit-scrollbar:vertical {
          width: 16px;
      }
    
      &::-webkit-scrollbar-thumb {
          background-color: #BFBFBF;
          border-radius: 20px;
          border: 4px solid #fff;
      }
    
      &::-webkit-scrollbar-track {
          border-radius: 10px;
          background-color: #fff;
      }
    
      &::-webkit-scrollbar:horizontal {
          width: 0;
          height: 0;
      }
  }
  
  .modal-fade-enter-active, .modal-fade-leave-active {
      transition: opacity 0.4s ease;
  }
  
  .modal-fade-enter-from, .modal-fade-leave-to {
      opacity: 0;
  }
  
  .modal-fade-enter-to, .modal-fade-leave-from {
      opacity: 1;
  }
</style>
  