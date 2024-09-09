<template>
    <transition>
      <div
        v-if="modalShow"
        class="absolute bg-white shadow-xl add flex-column"
        :style="`top: ${containerTop}px; right: 0; min-height: calc(100vh - ${containerTop}px); height: calc(100vh - ${containerTop}px); z-index: 601;`"
        ref="ref_section_show"
      >
        <div class="overflow-y-auto scrolling-sticky" style="height: calc(100% - 72px)">
          <div class="flex justify-between items-center px-6 py-5 mt-2">
            <div class=" text-center">
              <h1 class="font-[500] text-[22px]">Perfil del usuario</h1>
            </div>
            <div class="flex justify-end">
              <button class="" @click="closeModal">
                <img src="/assets/icons/1.TH.CLOSE.svg" alt="icon_close" class="w-6 h-6">
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
            <div class="flex flex-col mb-5">
                <span class="text-sm font-semibold">Antigüedad</span>
                <span class="text-base font-normal">{{ dataUser?.time }}</span>
            </div>
            <div class="flex flex-col mb-5">
                <span class="text-sm font-semibold">Estado del usuario</span>
                <div class="flex justify-between mt-[10px]">
                  <span v-if="dataUser.status == 1" class="px-2 py-2 font-[600] text-[10px] text-[#0B6357] bg-[#ECF9F5] rounded-full">
                    Activo
                  </span>
                  <span v-else class="px-2 py-2 font-[600] text-[10px] text-[#C53030] bg-red-100 rounded-full">
                    Inactivo
                  </span>
                  <div v-if="dataUser?.role?.name != 'Associate'">
                    <div v-if="dataUser.status == 1" @click="disabled" class="flex items-center px-2 py-3 text-black border border-[#333333] rounded-[6px] hover:bg-gray-100 cursor-pointer h-8">
                      <img src="/assets/icons/1.TH.PAUSE.svg" class="w-4 h-4 mr-2 text-black" alt="plus icon">
                      <span class="font-medium text-sm">Inactivar</span>
                    </div>
                    <div v-else @click="enabled" class="flex items-center px-2 py-3 text-black border border-[#333333] rounded-[6px] hover:bg-gray-100 cursor-pointer h-8">
                      <img src="/assets/icons/octicon_play-16.svg" class="w-4 h-4 mr-2" alt="plus icon">
                      <span class="font-medium text-sm">Activar</span>
                    </div>
                  </div>
                </div>
            </div>
            <hr class="mb-4">
            <div class="flex justify-start mb-5">
                <span class="text-base font-semibold mr-2">Hoteles asociados</span>
                <Tooltip
                        size="s"
                        :top="25"
                        :left="-55"
                    >
                        <template v-slot:button>
                            <img class="w-6 h-6" src="/assets/icons/info.blue.svg">
                        </template>
                        <template v-slot:content>
                            <p class="text-sm">
                                Si un usuario se encuentra <strong>inactivo</strong> en un hotel, no podrá realizar ninguna acción en dicho establecimiento. Para activarlo, puedes hacerlo desde la opción 'Editar usuario'.
                            </p>
                        </template>
                    </Tooltip>
            </div>
            <div class="flex flex-col items-left mb-4">
              <div class="ml-2 flex items-center mb-2" v-for="(hotel, index) in dataUser?.hotelsNameId" :key="index">
                <span class="mr-2 text-[#0B6357]">•</span> <!-- Punto antes del nombre del hotel -->
                <span class="font-normal text-base">{{ hotel }}</span>
              </div>
            </div>
            
          </div>
        </div>
        <!-- <div 
            class="tertiary-black-200 py-4 px-6 flex items-center justify-between border-t border-gray z-[1000] bg-white w-full" 
            style="height: 72px;" 
            v-if="dataUser.role.name != 'Associate' && ($isAdmin() || $isOperator())"
        > -->
        <div 
            class="tertiary-black-200 py-4 px-6 flex items-center justify-between border-t border-gray z-[1000] bg-white w-full" 
            style="height: 72px;" 
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
    import { ref, onMounted, nextTick, defineEmits,defineProps,watch } from 'vue';
    import Tooltip from '@/components/Tooltip.vue'
    import { disableUser,enableUser } from '@/api/services/users/userSettings.service';
    import { useToastAlert } from '@/composables/useToastAlert'

    const toast = useToastAlert();
    
    const emits = defineEmits(['close','update','delete','updateStatus']);
    
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

    const ref_section_show = ref(null);  // Declarar la referencia

    // Método para cerrar el modal si se hace clic fuera de él
    const handleClickOutside = (event) => {
      const addSection = ref_section_show.value;
      if (addSection && !addSection.contains(event.target)) {
        console.log('handleClickOutside',event.target)
        closeModal();
      }
    };

    watch(() => props.modalShow, (newVal) => {
      if (newVal) {
        nextTick(() => {
            registerClickOutside();
        });
      } else {
          unregisterClickOutside();
      }
    });

    const registerClickOutside = () => {
      document.addEventListener('click', handleClickOutside);
    };

    // Remover el evento de clic en el documento
    const unregisterClickOutside = () => {
      document.removeEventListener('click', handleClickOutside);
    };
    
    const enabled = async() => {
      const params = {
        user_id: props.dataUser.id,
      }

      const response = await enableUser(params);

      if (response.ok) {
        toast.warningToast('Usuario activado con éxito','top-right')
        closeModal();
        emits('updateStatus',response.data.user)
      }else{
        toast.errorToast('Error al activar el usuario','top-right')
      }
    }
    
    const disabled = async() => {

      const params = {
        user_id: props.dataUser.id,
      }
      const response = await disableUser(params);

      if (response.ok) {
        toast.warningToast('Usuario inactivado','top-right')
        closeModal();
        emits('updateStatus',response.data.user)
      }else{
        toast.errorToast('Error al inactivar el usuario','top-right')
      }
    }



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
  