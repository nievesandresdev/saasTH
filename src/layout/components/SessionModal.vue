<template>
    <ModalWindow v-if="modalProfile" :isVisible="modalProfile" @close="closeModalProfile()" :width="'369px'" padding-content="p-0" footer="true">
    <template #content>
      <div>
        <!-- <div class="flex justify-end w-full mb-[-15px]">
          <button @click="closeModalProfile" class="mt-[15px] mr-5">
            <img src="/assets/icons/1.TH.CLOSE.svg" alt="Cerrar" class="h-8 w-8" />
          </button>
        </div> -->
        <!-- <div class="text-center"> -->
          <div class="flex justify-between">
            <div class="flex-none w-14"></div>
            <img :src="`https://ui-avatars.com/api/?name=${authStore.user.name}&color=fff&background=${authStore.user.color}`" alt="Avatar" class="rounded-full mx-auto mb-2 mt-5" width="80" height="80" />
            <button @click="closeModalProfile" class="mr-4 mt-[-50px]">
              <img src="/assets/icons/1.TH.CLOSE.svg" alt="Cerrar" class="h-6 w-6" />
            </button>
          </div>
          <div class="text-center px-8">
            <h3 class="text-lg font-medium">{{ authStore.fullName }}</h3>
            <p class="text-sm text-gray-500 font-semibold">{{ $getRoleName(authStore.user.role) }}</p>
            <div class="mt-3 mb-6 flex justify-center gap-4">
              <!-- <button v-if="$isAssociate()" class="modal-button flex items-center justify-center py-2 text-[#8A8A8A] font-semibold text-xs hover:text-[#34A98F]">
                <img src="/assets/icons/1.TH.SUSCRIPCIÓN.svg" alt="Ver Suscripción" class="h-5 w-5 mb-1 mr-2 icon-hover" />
                Ver Suscripción
              </button> -->
              <button @click="redirectToUserPanel" class="modal-button flex items-center justify-center py-2 text-[#8A8A8A] font-semibold text-xs hover:text-[#34A98F]">
                <img src="/assets/icons/1.TH.Settings.svg" alt="Ajustes de cuenta" class="h-5 w-5 mr-2 icon-hover" />
                Ajustes de cuenta
              </button>
            </div>
          </div>
      </div>
    </template>
    <template #footer>
      <div class="border-t border-[#BFBFBF] mt-1 px-8 w-full py-4 hover:bg-[#FAFAFA] hover:rounded-b-[10px]">
        <button class="flex items-center  text-gray-700 w-full font-medium text-sm" @click.stop="logout">
          <img src="/assets/icons/1.TH.EXIT.svg" alt="Cerrar sesión" class="h-5 w-5 mr-2" />
          Cerrar sesión
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