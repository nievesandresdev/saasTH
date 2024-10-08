<template>
    <ModalWindow v-if="modalProfile" :isVisible="modalProfile" @close="closeModalProfile()" :width="'369px'" padding-content="p-0" footer="true">
    <template #content>
      <div class="px-8 pt-4 relative">
          <button  class="absolute top-2 right-2">
            <HoveredIcon 
                src="/assets/icons/1.TH.CLOSE.svg"
                :height_icon="'24px'"
                :width_icon="'24px'"
                :padding_container="'8px'"
                style="--background-color: #f3f3f3;"
                @click="closeModalProfile"
            />
          </button>
          <img 
            :src="`https://ui-avatars.com/api/?name=${authStore.user.name}&color=fff&background=${authStore.user.color}`"
            alt="Avatar" 
            class="rounded-full w-[72px] h-[72px] mx-auto"
          />
          <div class="text-center mt-3 pb-6">
            <h3 class="text-base font-semibold leading-[120%]">{{ authStore.fullName }}</h3>
            <p class="text-xs font-semibold leading-[130%] mt-1 text-[#8A8A8A]">{{ $getRoleName(authStore.user.role) }}</p>
            <button @click="redirectToUserPanel" class="flex items-center group mx-auto mt-3 ghost-green-600">
              <img src="/assets/icons/1.TH.Settings.svg" alt="Ajustes de cuenta" class="h-5 w-5 mr-1 ghost-green-600-icon" />
              <span class="text-[#8A8A8A] font-semibold text-xs leading-[130%] group-hover:text-[#34A98F]">Ajustes de cuenta</span>
            </button>
            
              <!-- <button v-if="$isAssociate()" class="modal-button flex items-center justify-center py-2 text-[#8A8A8A] font-semibold text-xs hover:text-[#34A98F]">
                <img src="/assets/icons/1.TH.SUSCRIPCIÓN.svg" alt="Ver Suscripción" class="h-5 w-5 mb-1 mr-2 icon-hover" />
                Ver Suscripción
              </button> -->
          </div>
      </div>
    </template>
    <template #footer>
      <div class="border-t border-[#BFBFBF] w-full">
        <button class="flex items-center px-8 hover-hbg-gray-200 py-[18px] w-full rounded-b-[10px]" @click.stop="logout">
          <img src="/assets/icons/1.TH.EXIT.svg" alt="Cerrar sesión" class="h-5 w-5 mr-2" />
          <span class="font-medium text-sm leading-[140%] text-[#333]">Cerrar sesión</span>
        </button>
      </div>
    </template>
  </ModalWindow>
</template>
<script setup>
import { inject } from 'vue'
import HoveredIcon from '@/components/Buttons/HoveredIcon.vue';
import ModalWindow from '@/components/ModalWindow.vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth/login'
import { useUtilStore } from '@/stores/modules/util';

const utilStore = useUtilStore();
const authStore = useAuthStore()
const router = useRouter()

const modalProfile = inject('modalProfile')

const closeModalProfile = () => {
  modalProfile.value = false
}

const logout = async () => {
  const login_from = localStorage.getItem('login_from');
  closeModalProfile()
  if(!utilStore.hasUnsavedChanges){
    await authStore.logout()
    if(login_from === 'admin'){
      window.location.href = 'https://www.google.com';
    }else{
    router.push('/login')
    }
  }else{
    router.push('/simulateLogout')
  }
}

function redirectToUserPanel() {
  router.push({ name: 'UserPanel' })
  closeModalProfile()
}

</script>