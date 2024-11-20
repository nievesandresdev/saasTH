<template>
    <transition>
      <div
        v-if="modalShow"
        class="absolute bg-white shadow-xl add flex flex-col"
        :class="userStore.showSuscriptionBanner ? 'top-with-banner h-with-banner' : 'h-without-banner top-0'"
        :style="`right: 0; z-index: 600`"
        ref="ref_section_show"
      >
        <div class="overflow-y-auto scrolling-sticky" style="height: calc(100% - 72px)">
          <div class="flex justify-between items-center px-6 py-5 h-[64px]">
            <div class=" text-center">
              <h1 class="font-[500] text-[22px]">Perfil del usuario</h1>
            </div>
            <div class="flex justify-end">
              <button class="" @click="closeModal">
                <img src="/assets/icons/1.TH.CLOSE.svg" alt="icon_close" class="w-8 h-8 hover:bg-[#F3F3F3] rounded-[100px] p-1">
              </button>
            </div>
          </div>
          <hr>
          <div class="px-6 py-8">
            <div class="flex flex-col mb-6">
                <span class="text-sm font-semibold">Usuario</span>
                <span class="text-base font-normal">{{ dataUser?.name }} {{ dataUser?.lastname }}</span>
            </div>
            <div class="flex flex-col mb-6">
                <span class="text-sm font-semibold">Puesto</span>
                <span class="text-base font-normal">{{ dataUser?.work_position?.name ?? '-' }}</span>
            </div>
            <div class="flex flex-col mb-6">
                <span class="text-sm font-semibold">Correo electrónico</span>
                <span class="text-base font-normal">{{ dataUser?.email }}</span>
            </div>
            <div class="flex flex-col mb-6">
                <span class="text-sm font-semibold">Teléfono</span>
                <span class="text-base font-normal">{{ dataUser?.prefix ?? '-' }} {{ dataUser?.phone ?? '-' }}</span>
            </div>
            <div class="flex flex-col mb-6">
                <span class="text-sm font-semibold">Antigüedad</span>
                <span class="text-base font-normal">{{ dataUser?.time }}</span>
            </div>
            <div class="flex flex-col mb-8">
              <div class="flex items-center gap-1">
                <span class="text-sm font-semibold">Estado del usuario</span>
                <Tooltip
                  size="s"
                  :top="25"
                  :left="-55"
              >
                  <template v-slot:button>
                      <img class="w-4 h-4" src="/assets/icons/info.blue.svg">
                  </template>
                  <template v-slot:content>
                      <p class="text-sm">
                          Si un usuario se encuentra <strong>inactivo</strong>, no podrá realizar ninguna acción en los alojamientos.
                      </p>
                  </template>
              </Tooltip>
              </div>
                
                <div class="flex justify-between mt-[10px]">
                  <span v-if="dataUser.status == 1" class="px-2 py-1 flex items-center justify-center font-[600] text-[10px] text-[#333] bg-[#ECF9F5] rounded-[100px] h-6">
                    Activo
                  </span>
                  <span v-else class="px-2 py-1 flex items-center justify-center font-[600] text-[10px] text-[#333] bg-red-100 rounded-[100px] h-6">
                    Inactivo
                  </span>
                  <div v-show="authStore.user.id != dataUser.id">
                    <div v-if="dataUser.status == 1" @click="disabled" class="group flex items-center px-2 py-3 text-black border border-[#333333] rounded-[6px] hover:border-[#2A8873] cursor-pointer h-8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="mr-2" fill="none">
                        <circle 
                          cx="8.00016" 
                          cy="7.99967" 
                          r="6.26667" 
                          stroke="#333333" 
                          stroke-width="0.8" 
                          class="group-hover:stroke-[#2A8873]" 
                        />
                        <path d="M6.6665 10.6663V5.33301M9.33317 10.6663V5.33301" stroke="#333333" stroke-width="1.4" stroke-linecap="round"/>
                      </svg>
                      <span class="font-medium text-sm group-hover:text-[#2A8873]">Inactivar</span>
                    </div>
                    <div v-else @click="enabled" class="group flex items-center px-2 py-3 text-black border border-[#333333] rounded-[6px] hover:border-[#2A8873] cursor-pointer h-8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="mr-2" fill="none">
                        <circle 
                          cx="8.00016" 
                          cy="7.99967" 
                          r="6.26667" 
                          stroke="#333333" 
                          stroke-width="0.8" 
                          class="group-hover:stroke-[#2A8873]" 
                        />
                        <path d="M6.72266 5.5L10.6115 8L6.72266 10.5V5.5Z" fill="#333333" stroke="#333333" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <span class="font-medium text-sm group-hover:text-[#2A8873]">Activar</span>
                    </div>
                  </div>
                </div>
            </div>
            <hr class="mb-[19px]">
            <div class="flex justify-start mb-5">
              <span class="text-base font-semibold mr-2">Alojamientos asociados</span>
            </div>
            <div class="flex flex-col items-left mb-4">
              <div class="ml-2 flex items-center mb-2" v-for="(hotel, index) in dataUser?.hotelsNameId" :key="index">
                <span class="mr-2 text-[#0B6357]">•</span> <!-- Punto hotel -->
                <span class="font-normal text-base">{{ hotel }}</span>
              </div>
            </div>
          </div>
        </div>
        <div 
          class="tertiary-black-200 py-6 px-6 flex items-center  border-t border-gray z-[1000] bg-white w-full" 
          style="height: 88px;" 
          :class="
              {
                  'justify-end': authStore.user.id === dataUser.id ,
                  'justify-between': authStore.user.id != dataUser.id
              }"
        >
          <button
              v-show="authStore.user.id != dataUser.id && dataUser.owner == 0"
              class="underline font-medium text-sm px-4"
              @click="deleteUser(dataUser)"
          >
              Eliminar
          </button>
          <button
              class="hbtn-cta px-4 py-3 font-medium rounded-[6px] leading-[110%] h-10"
              @click="updateUser(dataUser)"
              v-if="dataUser.owner != 1"
          >
              Editar
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
    import { useAuthStore } from '@/stores/modules/auth/login'
    import { useUserStore } from '@/stores/modules/users/users'

    const toast = useToastAlert();
    const authStore = useAuthStore();
    const userStore = useUserStore();
    
    const emits = defineEmits(['close','updateUser','delete','updateStatus']);
    
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
        emits('updateUser',dataUser);
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
        //console.log('handleClickOutside',event.target)
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
  