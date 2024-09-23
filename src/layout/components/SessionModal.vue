<template>
    <ModalWindow v-if="true" :isVisible="true" @close="closeModalProfile()" :width="'369px'" padding-content="p-0" footer="true">
    <template #content>
      <div class="px-8 pt-4 relative">
          <button @click="closeModalProfile" class="absolute top-4 right-4">
            <img src="/assets/icons/1.TH.CLOSE.svg" alt="Cerrar" class="h-6 w-6" />
          </button>
          <img 
            :src="`https://ui-avatars.com/api/?name=${authStore.user.name}&color=fff&background=${authStore.user.color}`"
            alt="Avatar" 
            class="rounded-full w-[72px] h-[72px] mx-auto"
          />
          <div class="text-center mt-3 pb-6">
            <h3 class="text-base font-semibold leading-[120%]">{{ authStore.fullName }}</h3>
            <p class="text-xs font-semibold leading-[130%] mt-1 text-[#8A8A8A]">{{ $getRoleName(authStore.user.role) }}</p>
            <button @click="redirectToUserPanel" class="flex items-center group mx-auto mt-3">
              <img src="/assets/icons/1.TH.Settings.svg" alt="Ajustes de cuenta" class="h-5 w-5 mr-1" />
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
      <div class="border-t border-[#BFBFBF] px-8 w-full py-[18px]">
        <button class="flex items-center" @click.stop="logout">
          <img src="/assets/icons/1.TH.EXIT.svg" alt="Cerrar sesión" class="h-5 w-5 mr-2" />
          <span class="font-medium text-sm leading-[140%] text-[#333]">Cerrar sesión</span>
        </button>
      </div>
    </template>
  </ModalWindow>
</template>
<script setup>
import { inject } from 'vue'
import ModalWindow from '@/components/ModalWindow.vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth/login'

const authStore = useAuthStore()
const router = useRouter()

const modalProfile = inject('modalProfile')

const closeModalProfile = () => {
  modalProfile.value = false
}

const logout = async () => {
  closeModalProfile()
  await authStore.logout()
  router.push('/login')
}

function redirectToUserPanel() {
  router.push({ name: 'UserPanel' })
  closeModalProfile()
}

</script>