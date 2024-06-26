<template>
    <transition>
      <div
        v-if="modal_add"
        class="absolute bg-white shadow-xl add flex-column"
        :style="`top: ${containerTop}px; right: 0; min-height: calc(100vh - ${containerTop}px); height: calc(100vh - ${containerTop}px); z-index: 10;`"
        ref="ref_section_add"
      >
        <div class="overflow-y-auto scrolling-sticky" style="height: calc(100% - 72px)">
          <div class="flex justify-between items-center px-6 py-4 mt-4">
            <div class="flex-1 text-center">
              <h1 class="font-[600] text-xl">Crear usuario</h1>
            </div>
            <div class="flex justify-end">
              <button class="" @click="closeModal">
                <img src="/assets/icons/1.TH.CLOSE.svg" alt="icon_close" class="w-5 h-5">
              </button>
            </div>
          </div>
  
          <div class="p-6">
            <hr class="mb-4">
            <div class="flex items-center justify-between px-4 mb-5">
              <div v-for="(step, index) in steps" :key="step.number" class="relative flex flex-col items-center">
                <div :class="['w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold z-10', currentStep >= step.number ? 'bg-[#34A98F] text-white' : 'bg-white text-black border border-black']">
                  {{ step.number }}
                </div>
                <div :class="['text-sm mt-2', currentStep >= step.number ? 'text-black' : 'text-gray-500']" class="font-semibold">
                  {{ step.label }}
                </div>
                <!-- border -->
                <div v-if="index !== steps.length - 1" :class="['absolute w-[170px] h-0 border top-5 left-3', currentStep >= (step.number + 1) ? 'border-[#34A98F]' : '']"></div>
              </div>
            </div>
            <hr class="mb-5">
            <div v-if="currentStep === 1">
              <div class="flex flex-col text-black">
                <span class="text-sm font-medium">Elige tu tipo de usuario</span>
                <span class="text-sm font-normal mt-2">Aquí podrás elegir el tipo de usuario que quieres crear.</span>
              </div>
              <div class="relative mt-2">
                <div class="relative w-full">
                  <input
                    type="text"
                    @click="toggleModalSelect"
                    :value="selectedRoleName"
                    readonly
                    class="bg-white w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-400 font-medium text-sm px-4 py-2.5 cursor-pointer"
                    placeholder="Selecciona el tipo de usuario deseado..."
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <img src="/assets/icons/1.TH.I.dropdownBig.svg">
                  </div>
                </div>
                <transition name="modal-fade">
                  <ModalSelect
                    :open="isModalOpen"
                    :options="seletedRoleUser"
                    @close="toggleModalSelect"
                    @select="selectRole"
                  />
                </transition>
              </div>
              <div class="relative mt-4">
                <div class="flex flex-col text-black">
                  <span class="text-sm font-medium mb-1">Puesto de Trabajo</span>
                </div>
                <div class="relative w-full">
                  <input
                      type="text"
                      id="workPositionInput"
                      @click.stop="toggleModalWorkPosition"
                      :value="selectedWorkPositionName"
                      readonly
                      class="bg-white w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-400 font-medium text-sm px-4 py-2.5 cursor-pointer"
                      placeholder="Selecciona el tipo de usuario deseado..."
                    />
                  <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <img src="/assets/icons/1.TH.I.dropdownBig.svg">
                  </div>
                </div>
                <transition name="modal-fade">
                  <div id="modalWorkPosition">
                    <ModalCrud
                      :data="work_positions"
                      :open="isModalCrudOpen"
                      @close="closeModalWorkPosition"
                      @test="closeModalWorkPosition"
                      @select="selectWorkPosition"
                    />
                  </div>
                </transition>
              </div>
            </div>
            <div v-if="currentStep === 2">
              <!-- Contenido del paso 2 -->
            </div>
            <div v-if="currentStep === 3">
              <!-- Contenido del paso 3 -->
            </div>
          </div>
        </div>
  
        <div class="py-4 px-6 w-full flex justify-between border-t border-gray z-[1000] bg-white" style="height: 72px;">
          <button
            class="px-4 py-2.5 font-medium rounded w-full bg-hoster-gray text-black"
            @click="prevStep"
            v-if="currentStep > 1"
          >
            Anterior
          </button>
          <button
            class="px-4 py-2.5 font-medium rounded w-full text-black"
            @click="currentStep === 3 ? handleStoreUser() : nextStep()"
            :disabled="isFormIncomplete"
            :class="isFormIncomplete ? 'bg-gray-300 text-gray-400' : 'hbtn-cta text-black '"
          >
            {{ currentStep === 3 ? 'Crear Usuario' : 'Siguiente' }}
          </button>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick, defineEmits,onUnmounted } from 'vue';
  import ModalSelect from './ModalSelect.vue';
  import ModalCrud from './ModalCrud.vue';
  
  
  const emits = defineEmits(['close']);
  
  const props = defineProps({
    modal_add: Boolean,
    work_positions: Array
  });
  
  const seletedRoleUser = ref([
    { id: 1, name: 'Usuario Propietario', description: 'Este tipo de usuario tiene permiso a todo, desde la creación de distintos tipos de usuario hasta poder ver la suscripción activa.' },
    { id: 2, name: 'Usuario Administrador', description: 'Este tipo de usuario tiene permiso a todo, desde la creación de distintos tipos de usuario hasta poder ver la suscripción activa.' },
    { id: 3, name: 'Usuario Operador', description: 'Este tipo de usuario tiene permiso a todo, desde la creación de distintos tipos de usuario hasta poder ver la suscripción activa.' }
  ]);
  
  const selectedRoleName = ref('Selecciona el tipo de usuario deseado');
  const selectedWorkPositionName = ref('Elige el puesto de trabajo');
  const isModalOpen = ref(false);
  const isModalCrudOpen = ref(false);
  
  const toggleModalSelect = () => {
    isModalOpen.value = !isModalOpen.value;
  };
  
  const toggleModalWorkPosition = () => {
    isModalCrudOpen.value = !isModalCrudOpen.value;
  };

  const closeModalWorkPosition = () => {
    isModalCrudOpen.value = false;
  }

  /**eventos para dar click en el div para abrir modal not save */
    /* const handleClickOutside = (event) => {
      if (modalWorkPosition.value && !modalWorkPosition.value.contains(event.target) && isModalCrudOpen.value) {
        isModalCrudOpen.value = false;
      }
    };

    onMounted(() => {
      window.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
      window.removeEventListener('click', handleClickOutside);
    }); */
  /**fin modal no save events */
  
  const selectRole = (rol) => {
    selectedRoleName.value = rol.name;
    isModalOpen.value = false;
  };
  
  const selectWorkPosition = (position) => {
    selectedWorkPositionName.value = position.name;
    isModalCrudOpen.value = false;
  };
  
  function closeModal() {
    emits('close');
  }
  
  const isFormIncomplete = ref(false);
  
  const currentStep = ref(1);
  const steps = [
    { number: 1, label: 'Usuario' },
    { number: 2, label: 'Hoteles' },
    { number: 3, label: 'Accesos' }
  ];
  
  const nextStep = () => {
    if (currentStep.value < steps.length) currentStep.value++;
  };
  
  const prevStep = () => {
    if (currentStep.value > 1) currentStep.value--;
  };
  
  const containerTop = ref(0);
  
  onMounted(async () => {
    await nextTick();
  
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
  