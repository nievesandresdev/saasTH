<template>
  <div class="group px-3 py-2 flex flex-col relative z-[600] shadow-lg bg-white h-full">
    <!-- select hotel -->
    <DropdownChangeHotel :width-menu="widthMenu"  :displayed-menu="displayedMenu" />
    
    <div class="overflow-y-auto bg-white no-scrollbar">
      <!-- links -->
      <router-link
        class="rounded-[10px] hbg-green-200 flex items-center p-2 mt-6"
        :class="{'hbg-green-600 shadow-lg': $route.name === 'DashboardIndex', 'hover-gray-100': $route.name !== 'DashboardIndex'}"
        to="/dashboard"
      >
        <img class="w-6 h-6" src="/assets/icons/1.TH.DASHBOARDNEW.svg" :class="{'icon-white': $route.name === 'DashboardIndex'}">
        <div :class="widthMenu">
          <p class="text-sm font-semibold ml-2 whitespace-nowrap text-left leading-[120%]" :class="{'text-white': $route.name === 'DashboardIndex'}">
            Dashboard
          </p>
        </div>
      </router-link>
      <template v-for="(section, index) in menu_links" :key="index">
        <div 
          :class="`mt-4 py-2.5 min-h-[40px] h-10 ${widthMenu} ${displayedMenu ? 'pl-3' : 'group-hover:pl-3'}`"
        >
          <p class="text-sm font-semibold">
            {{ section.title }}
          </p>
        </div>
        <div 
          class="rounded-[10px] hbg-green-200"
        >
          <router-link
            v-for="(link, indexLink) in section.group" :key="indexLink"
            :to="link.url"
            class="rounded-[10px] flex items-center p-2"
            :class="{'hbg-green-600 shadow-lg': link.include.includes($route.name), 'hover-gray-100': !link.include.includes($route.name)}"
          >
            <img class="w-6 h-6" :src="`/assets/icons/${link.icon}.svg`" :class="{'icon-white': link.include.includes($route.name)}">
            <div :class="widthMenu">
              <p class="text-sm font-semibold ml-2 whitespace-nowrap text-left leading-[120%]" :class="{'text-white': link.include.includes($route.name)}">{{link.title}}</p>
            </div>
          </router-link>
        </div>
      </template>

      <!-- help, user and news -->
      <div class="mt-auto mb-4 pt-4">
        <button 
          v-for="(button, indexButton) in user_buttons" :key="indexButton"
          @click="button.action && button.action()"
          class="rounded-[10px] flex items-center p-1 max-h-[40px]"
          :class="{'hbg-green-600 shadow-lg': button.active, 'hover-gray-100': !button.active}"
        >
          <img 
            class="w-8 h-8 rounded-full" :src="button.icon"
            :class="{'icon-white': false, 'border border-white': button.active}"
          >
          <div :class="widthMenu">
            <p 
              class="text-sm font-semibold ml-2 text-left leading-[120%]"
              :class="{'text-white': button.active}"
            >{{button.title}}</p>
          </div>
        </button>

        <!-- User Name -->
        <button 
          @click="modalProfile = true"
          class="rounded-[10px] flex items-center p-1 max-h-[40px]"
          :class="{'hbg-green-600 shadow-lg': route.name === 'UserPanel', 'hover-gray-100': route.name !== 'UserPanel'}"
        >
          <img 
            class="w-8 h-8 rounded-full" :src="userStore.$userAvatar()"
            :class="{'icon-white': false, 'border border-white': route.name === 'UserPanel'}"
          >
          <div :class="widthMenu">
            <p 
              class="text-sm font-semibold ml-2 text-left leading-[120%]"
              :class="{'text-white': route.name === 'UserPanel'}"
            >{{ authStore.fullName }}</p>
          </div>
        </button>
      </div>
    </div>
  </div>

  <ModalWindow v-if="modalProfile" :isVisible="modalProfile" @close="closeModalProfile()" :width="'369px'" padding-content="p-6" footer="true">
    <template #content>
      <div>
        <div class="flex justify-end w-full">
          <button @click="closeModalProfile">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="text-center">
          <img :src="`https://ui-avatars.com/api/?name=${authStore.user.name}&color=fff&background=${authStore.user.color}`" alt="Avatar" class="rounded-full mx-auto mb-2" width="80" height="80" />
          <h3 class="text-lg font-medium">{{ authStore.user.name }}</h3>
          <p class="text-sm text-gray-500">{{ $getRoleName(authStore.user.role) }}</p>
          <div class="mt-4 flex justify-between gap-4">
            <button v-if="$isAssociate()" class="modal-button flex items-center justify-center py-2 text-[#8A8A8A] font-bold text-xs hover:text-[#34A98F]">
              <img src="/assets/icons/1.TH.SUSCRIPCIÓN.svg" alt="Ver Suscripción" class="h-5 w-5 mb-1 mr-2 icon-hover" />
              Ver Suscripción
            </button>
            <button @click="redirectToUserPanel" class="modal-button flex items-center justify-center py-2 text-[#8A8A8A] font-bold text-xs hover:text-[#34A98F]">
              <img src="/assets/icons/1.TH.Settings.svg" alt="Ajustes de cuenta" class="h-5 w-5 mr-2 icon-hover" />
              Ajustes de cuenta
            </button>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="border-t border-[#BFBFBF] mt-1 pt-4 w-full p-6">
        <button class="flex items-center py-2 text-gray-700 w-full font-medium text-sm" @click.stop="logout">
          <img src="/assets/icons/1.TH.EXIT.svg" alt="Cerrar sesión" class="h-5 w-5 mr-2" />
          Cerrar sesión
        </button>
      </div>
    </template>
  </ModalWindow>
</template>

<script setup>
import { ref, computed, onMounted, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth/login'
import { useUserStore } from '@/stores/modules/users/users'
import { useHotelStore } from '@/stores/modules/hotel'
import ModalWindow from '@/components/ModalWindow.vue'
import DropdownChangeHotel from './components/DropdownChangeHotel'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()
const hotelStore = useHotelStore()

provide('hotelStore', hotelStore);

const modalProfile = ref(false)

function redirectToUserPanel() {
  router.push({ name: 'UserPanel' })
  closeModalProfile()
}

const closeModalProfile = () => {
  modalProfile.value = false
}

const menu_links = ref([
  {
    title: 'Operación',
    group: [
      {
        title: 'Estancias ',
        icon: '1.TH.ESTANCIAS.MM',
        include: ['StayHomePage'],
        url: '/estancias',
      },
      {
        title: 'Reseñas',
        icon: '1.TH.DASHBOARDNEW',
        include: ['-'],
        url: '/dashboard',
      },
      {
        title: 'Análisis',
        icon: '1.TH.DASHBOARDNEW',
        include: ['-'],
        url: '/dashboard',
      },
    ],
  },
  {
    title: 'Administración',
    group: [
      {
        title: 'WebApp',
        icon: '1.TH.DASHBOARDNEW',
        include: [
          'ReviewRequestSettingsIndex',
          'SettingsPreStayPage',
          'SettingsStayPage',
          'SettingsPostStayPage',
        ],
        url: '/dashboard',
      },
      {
        title: 'Comunicaciones',
        icon: '1.TH.DASHBOARDNEW',
        include: ['-'],
        url: '/dashboard',
      },
      {
        title: 'Plataformas externas',
        icon: '1.TH.DASHBOARDNEW',
        include: ['-'],
        url: '/dashboard',
      },
      {
        title: 'Datos',
        icon: '1.TH.DASHBOARDNEW',
        include: ['-'],
        url: '/dashboard',
      },
      {
        title: 'Equipo',
        icon: '1.TH.DASHBOARDNEW',
        include: ['UserNotificationsSettings', 'UsersSettings'],
        url: '/usuarios/configuracion/usuarios',
      },
    ],
  },
])

const user_buttons = ref([
  {
    title: 'Ayuda',
    icon: '/assets/icons/1.TH.AYUDA.MM.svg',
    include: ['-'],
  },
  {
    title: 'Novedades',
    icon: '/assets/icons/1.TH.NOVEDADES.MM.svg',
    include: ['-'],
  },
  /* {
    title: 'Perfil',
    icon: `${userStore.$userAvatar()}`,
    include: ['UserPanel'],
    border: true,
    action: () => {
      modalProfile.value = true
    },
    active: computed(() => route.name === 'UserPanel'),
  }, */
])

const displayedMenu = computed(() => route.meta.displayedMenu ?? false)
const widthMenu = computed(() => {
  let withStyles =
    'w-0 group-hover:w-[188px] overflow-hidden transition-all duration-500 ease-in-out'
  if (displayedMenu.value) {
    withStyles = 'w-[188px]'
  }
  return withStyles
})

onMounted(() => {
    hotelStore.loadHotelsAvailables();
})

const logout = async () => {
  await closeModalProfile()
  await authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.modal-button:hover .icon-hover {
  filter: invert(41%) sepia(58%) saturate(3098%) hue-rotate(127deg) brightness(91%) contrast(91%)
}
.hbg-green-200 {
  background-color: #E2F8F2;
}
.hbg-green-600 {
  background-color: #34A98F;
}
</style>
