<template>
    <transition>
      <div
        v-if="modalAdd"
        class="absolute bg-white shadow-xl add flex flex-col"
        :class="userStore.showSuscriptionBanner ? 'top-with-banner h-with-banner' : 'h-without-banner top-0'"
        :style="`right: 350px; z-index: 2000`"
        ref="ref_section_add"
        
      >
          <div class="overflow-y-auto scrolling-sticky" style="height: calc(100% - 72px)">
            Hola
          </div>
  
         
         <!--  <ModalNoSave
            :id="'not-saved'"
            :open="showModalNoSave"
            text="Tienes cambios sin guardar. ¿Estás seguro de que quieres salir sin guardar?"
            textbtn="Guardar"
            @close="closeModalSaveCreate"
            @saveChanges="handleStoreUser"
            :type="'alone_exit'"
            :url="intendedRoute"
            @hidden="handleCloseModal"
          />
          <ModalDeleteWork :isDeleteWorkPositions="isDeleteWorkPositions" @close="closeDeleteWorkPositions" :data="dataDeleteWP" @delete="getWorkPositions"  /> -->
      </div>
    </transition>

    
  </template>
  
  <script setup>
  import { ref, onMounted,onUnmounted, nextTick, defineEmits,computed,watch,onBeforeUnmount } from 'vue';


  import ModalNoSave from '@/components/ModalNoSave.vue';
  import { useRoute, useRouter } from 'vue-router';


  import { useUserStore } from '@/stores/modules/users/users';
  const userStore = useUserStore();

  const emits = defineEmits(['close','store','alert','workPositionGet','deleteWP','handleDeleteWP']);


  const ref_section_add = ref(null);  // Declarar la referencia

  const router = useRouter();

  const props = defineProps({
    modalAdd: Boolean,
  });


onMounted(async () => {
  await nextTick();
});


function closeModal() {
 /*  if (changes.value) {
    if (!selectedText.value) { //validar que no haya texto seleccionado, para que salga el alert de cambios sin guardar
      showModalNoSave.value = true;
    } else { //si hay texto seleccionado, se cierra el modal sin alerta
      showModalNoSave.value = false;
    }
  } else if(!mouseDownInside.value) { // Si no hay cambios y el click fue fuera, cerrar el modal
    console.log('closeModal')
    emits('close');
    isModalCrudOpen.value = false;
  } */

  emits('close');
}

const handleClickOutside = (event) => {
  const addSection = ref_section_add.value;
  //const modalCrud = ref_modal_crud.value ? ref_modal_crud.value.$el : null;

  if (
    addSection && !addSection.contains(event.target) &&
    !event.target.closest('.hbtn-tertiary') && // Asegúrate de no cerrar cuando el clic es en el botón "Atras"
    !event.target.closest('.modalContainerRef') // Asegúrate de no cerrar cuando el clic es en el botón "Siguiente"
  ) {
    closeModal();
  }
};

// Registrar el evento de clic en el documento con retraso
const registerClickOutside = () => {
  document.addEventListener('click', handleClickOutside);
};

// Remover el evento de clic en el documento
const unregisterClickOutside = () => {
  document.removeEventListener('click', handleClickOutside);
};
  
  const containerTop = ref(0);

  onMounted(async () => {
    await nextTick();
    const sectionExpElement = document.getElementById('layout-hoster');
    if (sectionExpElement) {
      containerTop.value = sectionExpElement.offsetTop;
    }


    registerClickOutside();  // Registrar el listener de clic fuera

  });

  onBeforeUnmount(() => {
    unregisterClickOutside();  // Remover el listener de clic fuera
  });

  </script>
  
  <style lang="scss">
  .add {
    width: 500px;
    position: fixed;
  }
  
  .v-enter-active,
  .v-leave-active {
    transition: transform 0.5s ease;
  }
  
  .v-enter-from,
  .v-leave-to {
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
  
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity 0.4s ease;
  }
  
  .modal-fade-enter-from,
  .modal-fade-leave-to {
    opacity: 0;
  }
  
  .modal-fade-enter-to,
  .modal-fade-leave-from {
    opacity: 1;
  }
  </style>
  