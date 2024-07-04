<template>
    <transition>
      <div
        v-if="modalShow"
        class="absolute bg-white shadow-xl add flex-column"
        :style="`top: ${containerTop}px; right: 0; min-height: calc(100vh - ${containerTop}px); height: calc(100vh - ${containerTop}px); z-index: 10;`"
        ref="ref_section_add"
      >
        <div class="overflow-y-auto scrolling-sticky" style="height: calc(100% - 72px)">
          <div class="flex justify-between items-center px-6 py-4 mt-3">
            <div class="flex-1 text-center">
              <h1 class="font-[600] text-md">Perfil del usuario</h1>
            </div>
            <div class="flex justify-end">
              <button class="" @click="closeModal">
                <img src="/assets/icons/1.TH.CLOSE.svg" alt="icon_close" class="w-5 h-5">
              </button>
            </div>
          </div>
          <hr class="mb-4">
          <div class="p-6">
            <div class="flex flex-col mb-5">
                <span class="text-sm font-semibold">Tipo de usuario</span>
                <span class="text-base font-normal">{{ $getRoleName(dataUser?.role?.name) }}</span>
            </div>
            <div class="flex flex-col mb-5">
                <span class="text-sm font-semibold">Puesto</span>
                <span class="text-base font-normal">{{ dataUser?.work_position }}</span>
            </div>
            <div class="flex flex-col mb-5">
                <span class="text-sm font-semibold">Usuario</span>
                <span class="text-base font-normal">{{ dataUser?.name }} {{ dataUser?.lastname }}</span>
            </div>
            <div class="flex flex-col mb-5">
                <span class="text-sm font-semibold">Teléfono</span>
                <span class="text-base font-normal">{{ dataUser?.prefix }} {{ dataUser?.phone }}</span>
            </div>
            <hr class="mb-4">
            <div class="flex justify-between mb-5">
                <span class="text-base font-semibold">Hoteles asociados</span>
                <Tooltip
                        size="m"
                        :top="25"
                        :right="0"
                    >
                        <template v-slot:button>
                            <img class="w-6 h-6" src="/assets/icons/1.TH.INFO.svg">
                        </template>
                        <template v-slot:content>
                            <p class="text-sm">
                                Si un usuario se encuentra <strong>inactivo</strong> en un hotel, no podrá realizar ninguna acción en dicho establecimiento. Para activarlo, puedes hacerlo desde la opción 'Editar usuario'.
                            </p>
                        </template>
                    </Tooltip>
            </div>
            <div class="flex flex-col items-left mb-4">
                <div class="ml-2 flex justify-between mb-2"  v-for="(hotel,index) in dataUser?.hotelsNameId" :key="index">
                    <span class="font-normal text-base">{{hotel}}</span>
                    <span class="px-4 py-2 font-[600] text-[12px] rounded-full min-w-[80px] text-center bg-[#ECF9F5] text-[#0B6357]">
                        Activo
                    </span>

                </div>
            </div>
          </div>
        </div>
        <div 
            class="tertiary-black-200 py-4 px-6 flex items-center justify-between border-t border-gray z-[1000] bg-white w-full" 
            style="height: 72px;" 
            v-if="dataUser.role.name != 'Associate' && ($isAdmin() || $isOperator())"
        >
            <button
                class="underline font-medium"
                @click="deleteUser(dataUser)"
            >
               Eliminar usuario
            </button>
            <button
                class="hbtn-cta px-4 py-3 font-medium rounded-[6px] leading-[110%]"
                @click="updateUser(dataUser)"
            >
                Editar usuario
            </button>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
    import { ref, onMounted, nextTick, defineEmits,defineProps } from 'vue';
    import Tooltip from '@/components/Tooltip.vue'
    
    const emits = defineEmits(['close','update','delete']);
    
    const props = defineProps({
        modalShow: Boolean,
        workPositions: Array,
        dataUser : Object
    });

    const closeModal = () => {
        emits('close');
    };

    const updateUser = (dataUser) => {
        closeModal();
        emits('update',dataUser);
    };

    const deleteUser = (dataUser) => {
        closeModal();
        emits('delete',dataUser);
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
  