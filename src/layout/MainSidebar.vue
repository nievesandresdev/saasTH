<template>
  <div
    id="main-menu"
    :class="groupClass"
    class="px-3 py-2 flex flex-col relative z-[600] shadow-lg bg-white h-full"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- select hotel -->
    <DropdownChangeHotel :width-menu="widthMenu" :displayed-menu="displayedMenu" />
    <div class="overflow-y-auto bg-white no-scrollbar">
      <!-- links -->
      <router-link
        @mousemove="handleMouseMove('Dashboard')"
        @click="handleMenuItemClick('Dashboard')"
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
            @mousemove="handleMouseMove(link.title)"
            @click="handleMenuItemClick(link.title)"
            class="rounded-[10px] flex items-center p-2 relative"
            :class="{'hbg-green-600 shadow-lg': link.include.includes($route.name), 'hover-gray-100': !link.include.includes($route.name)}"
          >
            <!-- notification icon -->
            <img 
              class="w-2.5 h-2.5 absolute top-1.5 left-5" 
              src="/assets/icons/1.TH.DOT.NOTIFICATION.svg" 
              alt="notification icon"
              v-if="link.title == 'Estancias' && (countPendingQueries > 0 || countPendingChats > 0)"
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
          @mousemove="handleMouseMove(button.title)"
          @click="handleMenuItemClick(button.title)"
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
          @mousemove="handleMouseMove('User Profile')"
          @click="modalProfile = true"
          class="rounded-[10px] flex items-center p-1 max-h-[40px]"
          :class="{'hbg-green-600 shadow-lg': route.name === 'UserPanel', 'hover-gray-100': route.name !== 'UserPanel'}"
        >
          <img 
            class="w-8 h-8 rounded-full" :src="userAvatar"
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
          <div class="text-center">
            <h3 class="text-lg font-medium">{{ authStore.fullName }}</h3>
            <p class="text-sm text-gray-500 font-semibold">{{ $getRoleName(authStore.user.role) }}</p>
            <div class="mt-4 flex justify-center gap-3">
              <button v-if="$isAssociate()" class="modal-button flex items-center justify-center py-2 text-[#8A8A8A] font-semibold text-xs hover:text-[#34A98F]">
                <img src="/assets/icons/1.TH.SUSCRIPCIÓN.svg" alt="Ver Suscripción" class="h-5 w-5 mb-1 mr-2 icon-hover" />
                Ver Suscripción
              </button>
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

  <ModalHelp ref="modalHelpRef"/>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, provide, inject } from 'vue'
import { getPusherInstance, isChannelSubscribed, setChannelSubscribed } from '@/utils/pusherSingleton'
import { useRoute, useRouter } from 'vue-router'
//components
import ModalWindow from '@/components/ModalWindow.vue'
import DropdownChangeHotel from './components/DropdownChangeHotel'
import ModalHelp from './components/ModalHelp'
//stores
import { useAuthStore } from '@/stores/modules/auth/login'
import { useUserStore } from '@/stores/modules/users/users'
import { useHotelStore } from '@/stores/modules/hotel'
import { useQueryStore } from '@/stores/modules/queries/query'
import { useChatStore } from '@/stores/modules/chat/chat'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()
const hotelStore = useHotelStore()
const queryStore = useQueryStore()
const chatStore = useChatStore()

const userAvatar = computed(() => userStore.$userAvatar);

provide('hotelStore', hotelStore);
const isNotifyPanelVisible = inject('isNotifyPanelVisible');

const modalProfile = ref(false)
const countPendingQueries = ref(0)
const countPendingChats = ref(0)
const isMouseMoving = ref(false)
const modalHelpRef = ref(false)
//pusher
const pusher = ref(null)
const channelQuery = ref(null)
const channelStay = ref(null)
const onHoverMainMenu = ref(false)

provide('onHoverMainMenu', onHoverMainMenu)

const connectPusher = async () => {

    pusher.value = getPusherInstance();
    let channelNameQuery = 'notify-send-query.' + hotelStore.hotelData.id;
    let channelNameStay = 'private-noti-hotel.' + hotelStore.hotelData.id;

    channelQuery.value = pusher.value.subscribe(channelNameQuery);
    channelQuery.value.bind('App\\Events\\NotifySendQueryEvent', async (data) => {
        showNotification(data.title,data.text,data.urlQuery,10000);
        countPendingQueries.value = await queryStore.$countPendingByHotel();
        //loadExistsPending();
    });
    
    channelStay.value = pusher.value.subscribe(channelNameStay);
    channelStay.value.bind('App\\Events\\NotifyStayHotelEvent', async (data) => {
      // console.log('NotifyStayHotelEvent',data)
        //notificacion del navegador cuando se recibe un mensaje
        if(!Number(data.automatic) && data.guest){
            let room_text =  'Estancia: nº habitación ';
            data.room ? room_text=room_text+data.room : room_text=room_text+'no asignado';
            // let link  = route('stay.hoster.chat',{selected:data.stay_id});
            let routeData = {
              name : 'StayChatRoom',
              params : { stayId : data.stay_id },
              query : { g : data.guest_id }
            };
            showNotification(room_text, data.text, routeData, 10000);
        }
        countPendingChats.value = await chatStore.$pendingCountByHotel();
        // get_stay_data_pending();
        // defineNotificationsCount();
    });
};

function redirectToUserPanel() {
  router.push({ name: 'UserPanel' })
  closeModalProfile()
}

const closeModalProfile = () => {
  modalProfile.value = false
}

const handleMouseMove = () => {
  isMouseMoving.value = true
}

const openModalHelp = () => {
  modalHelpRef.value.open();
}

const handleMenuItemClick = (nameButtom) => {
  isMouseMoving.value = false;
  if (nameButtom === 'Ayuda') {
    openModalHelp();
  }
  if (nameButtom === 'Novedades') {
    isNotifyPanelVisible.value = true;   
  }
}

const menu_links = ref([
  {
    title: 'Operación',
    group: [
      {
        title: 'Estancias',
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
          'Places',
          'Facilities',
          'Perfil',
          'Experiences',
        ],
        url: '/webapp',
      },
      {
        title: 'Comunicaciones',
        icon: '1.TH.DASHBOARDNEW',
        include: ['-'],
        url: '/dashboard',
      },
      {
        title: 'Plataformas',
        icon: '1.TH.DASHBOARDNEW',
        include: ['UserNotificationsSettings', 'UsersSettings'],
        url: '/equipo/configuracion/usuarios',
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

const groupClass = computed(() => ({
  group: isMouseMoving.value
}))

const showNotification = (title, text, route, timeout) =>{
    if (Notification.permission === 'granted') {
        displayNotification(title, text, route, timeout);
    } else if (Notification.permission !== 'denied') { // Si el permiso no ha sido denegado ni concedido ("default")
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                displayNotification(title, text, route, timeout);
            }
        });
    }
}

const displayNotification = (title, text, route, timeout) => {
    const notif = new Notification(title, {
        body: text,
        icon:'/assets/icons/1.TH.ChatBubblegreen.svg',
        requireInteraction: true
    });
    notif.onclick = (event) => {
        event.preventDefault();
        if(route.name){
          router.push({
              name: route.name,
              params: route.params,
              query: route.query,
          }); 
        } 
    };
    setTimeout(() => {
        notif.close();
    }, timeout);
}
onMounted(async() => {
    hotelStore.loadHotelsAvailables();
    countPendingQueries.value = await queryStore.$countPendingByHotel();
    countPendingChats.value = await chatStore.$pendingCountByHotel();
    connectPusher();
})

onUnmounted(() => {
    if (channelStay.value) {
        channelStay.value.unbind('App\\Events\\NotifyStayHotelEvent');
        pusher.value.unsubscribe(channelStay.value);
    }

    if (channelQuery.value) {
        channelQuery.value.unbind('App\\Events\\NotifySendQueryEvent');
        pusher.value.unsubscribe(channelQuery.value);
    }
});

function handleMouseEnter () {
  onHoverMainMenu.value = true;
}

function handleMouseLeave () {
  onHoverMainMenu.value = false;
}

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
