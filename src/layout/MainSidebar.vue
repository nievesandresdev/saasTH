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
    <div class=" bg-white no-scrollbar">
      <!-- links -->
      <router-link
        @mousemove="handleMouseMove('Dashboard')"
        @click="handleMenuItemClick('Dashboard')"
        class="rounded-[10px]  flex items-center p-2 mt-6"
        :class="
        {
          'hbg-green-600  shadow-lg': $route.name === 'DashboardIndex',
          'hover-gray-100 bg-[#e2f8f2]': $route.name !== 'DashboardIndex'
         }"
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
          v-for="(link, indexLink) in section.group" 
          :key="indexLink"
          :class="[
            'bg-[#E2F8F2]',
            checkPermission(link) || checkSubscriptionStatus(link) ? 'bg-opacity-50' : '',
            indexLink === 0 ? 'rounded-t-[10px]' : '',
            indexLink === section.group.length - 1 ? 'rounded-b-[10px]' : ''
          ]"
        >
          <router-link
            :to="checkPermission(link) || checkSubscriptionStatus(link) ? '#' : link.url"
            @click="handleMenuItemClick($event, link, indexLink)"
            class="flex items-center p-2 relative rounded-[10px]"
            @mouseover="handleMouseOverTooltip(link, indexLink,props.subscription.status)"
            @mouseleave="handleMouseLeaveTooltip(link, indexLink,props.subscription.status)"
            :class="[
              link.include.includes($route.name) ? 
                [
                  'hbg-green-600 shadow-lg',
                  indexLink === 0 ? 'rounded-t-[10px]' : '',
                  indexLink === section.group.length - 1 ? 'rounded-b-[10px]' : '',
                ] 
                : 
                [
                  checkPermission(link) || checkSubscriptionStatus(link) ? '' : 'hover:bg-gray-100',
                  indexLink === 0 ? 'rounded-t-[10px]' : '',
                  indexLink === section.group.length - 1 ? 'rounded-b-[10px]' : '',
                ],
              checkPermission(link) || checkSubscriptionStatus(link) ? 'cursor-not-allowed' : 'cursor-pointer',
            ]"
          >
          <!-- notification icon -->
          <img 
              class="w-2.5 h-2.5 absolute top-1.5 left-5 z-10" 
              src="/assets/icons/1.TH.DOT.NOTIFICATION.svg" 
              alt="notification icon"
              v-if="(link.title == 'Estancias' && (countPendingQueries > 0 || countPendingChats > 0)) || (link.title == 'Reseñas' && conuntReviewsPending > 0)"
            >
            <!-- Icono -->
            <img 
              class="w-6 h-6" 
              :src="`/assets/icons/${link.icon}.svg`" 
              :class="{
                'icon-white': link.include.includes($route.name),
                'opacity-50': checkPermission(link) || checkSubscriptionStatus(link)
              }"
            >
            
            <!-- Texto -->
            <div :class="widthMenu">
              <p 
                class="text-sm font-semibold ml-2 whitespace-nowrap text-left leading-[120%]"
                :class="{
                  'text-white': link.include.includes($route.name),
                  'opacity-25': checkPermission(link) || checkSubscriptionStatus(link)
                }"
              >
                {{ link.title }}
              </p>
            </div>
            
            <!-- Tooltip manual -->
            <div
              v-if="!permissions[link.permissionName] && showTooltip[link.permissionName]"
              class="absolute z-[90000] p-4 bg-white rounded-[10px] shadow-tooltip w-[290px]"
              :style="{
                top: '70%',
                left: '70%',
                transform: 'translate(-50%, 8px)'
              }"
            >
              <p class="text-sm font-normal">
                Necesitas permisos para acceder a esta sección. Solicita acceso a tu responsable o superior para poder entrar.
              </p>
            </div>

            <!-- Tooltip subscripcion -->
            <div
              v-if="showSubscriptionTooltip[link.permissionName]"
              class="absolute z-[90000] p-4 bg-white rounded-[10px] shadow-tooltip w-[290px]"
              :style="{
                top: '70%',
                left: '70%',
                transform: 'translate(-50%, 8px)'
              }"
            >
            <h5 class="text-sm font-medium mb-4">
              No estás suscrito
                </h5>
                <p class="text-sm mb-4">
                  Tú periodo de free trial ha concluido. Para tener acceso a la operación de tu alojamiento y poder seguir disfrutando de la experiencia TheHoster al completo contacta con nosotros y gestiona tu suscripción con nuestro comercial,
                </p>
                <p class="text-sm">
                  Nuestro horario de atención es de lunes a jueves de 8:30 a 18:30 y los viernes de 8:30 a 14:30. Estaremos encantados de poder ayudarte
                </p>
            </div>
          </router-link>
        </div>


      </template>

      <!-- help, user and news -->
      <div class="mt-auto pt-4 absolute inset-x-0 bottom-0 mb-6 px-3">
        <button 
          v-for="(button, indexButton) in user_buttons" :key="indexButton"
          @mousemove="handleMouseMove(button.title)"
          @click="handleMenuItemClick(button.title)"
          class="rounded-[10px] flex items-center p-1 h-[44px]"
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
        <!-- <button 
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
              class="text-sm font-semibold ml-2 text-left leading-[120%] whitespace-nowrap"
              :class="{'text-white': route.name === 'UserPanel'}"
            >{{ authStore.fullName }}</p>
          </div>
        </button> -->
        <!-- <pre>{{ permissions }}</pre> -->
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
          <div :class="widthMenu + ' max-w-[200px]'">
            <p 
              class="text-sm font-semibold ml-2 text-left leading-[120%] whitespace-nowrap overflow-hidden text-ellipsis"
              :class="{'text-white': route.name === 'UserPanel'}"
            >
              {{ authStore.fullName }}
            </p>
          </div>
        </button>
      </div>
    </div>
  </div>


</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, provide, inject,reactive } from 'vue'
import { getPusherInstance, isChannelSubscribed, setChannelSubscribed } from '@/utils/pusherSingleton'
import { useRoute, useRouter } from 'vue-router'
//components
import DropdownChangeHotel from './components/DropdownChangeHotel'
//stores
import { useAuthStore } from '@/stores/modules/auth/login'
import { useUserStore } from '@/stores/modules/users/users'
import { useHotelStore } from '@/stores/modules/hotel'
import { useQueryStore } from '@/stores/modules/queries/query'
import { useChatStore } from '@/stores/modules/chat/chat'
import { useReviewStore } from '@/stores/modules/review'
import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';

const props = defineProps({
  subscription: {
      type: Object,
      default: () => ({}),
  },
})

const emit = defineEmits(['openmodalHelp'])
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()
const hotelStore = useHotelStore()
const queryStore = useQueryStore()
const chatStore = useChatStore()
const reviewStore = useReviewStore()

const userAvatar = computed(() => userStore.$userAvatar);
const permissions = computed(() => authStore.$getPermissions || {});

const showTooltip = reactive({});
const showSubscriptionTooltip = reactive({});

function handleMouseOverTooltip(link, indexLink, status = null) {
  // console.log('permissions[link.permissionName]',Object.keys(permissions.value).length)
  if (!permissions[link.permissionName] && Object.keys(permissions.value).length > 0) {
    showTooltip[link.permissionName] = true;
  }

  if (checkSubscriptionStatus(link)) {
    showSubscriptionTooltip[link.permissionName] = true;
  }
}

function handleMouseLeaveTooltip(link, indexLink,status = null) {

  if (checkSubscriptionStatus(link)) {
    showSubscriptionTooltip[link.permissionName] = false;
  }
  
  if (!permissions[link.permissionName] && Object.keys(permissions.value).length > 0) {
    showTooltip[link.permissionName] = false;
  }
}

const checkSubscriptionStatus = (link) => {
    return (props.subscription.status == 2 || props.subscription.status == 3) && link?.subscription == true;
};

const checkPermission = (link) => {
    return !permissions.value[link.permissionName] && Object.keys(permissions.value).length > 0;
};



provide('hotelStore', hotelStore);
const isNotifyPanelVisible = inject('isNotifyPanelVisible');

const modalProfile = inject('modalProfile')
const countPendingQueries = ref(0)
const countPendingChats = ref(0)
const conuntReviewsPending = ref(0)
const isMouseMoving = ref(false)

//pusher
const pusher = ref(null)
const channelQuery = ref(null)
const channelStay = ref(null)
const channelChat = ref(null)
const onHoverMainMenu = ref(false)

provide('onHoverMainMenu', onHoverMainMenu)

const connectPusher = async () => {

    pusher.value = getPusherInstance();
    let channelNameQuery = 'notify-send-query.' + hotelStore.hotelData.id;
    let channelNameStay = 'private-noti-hotel.' + hotelStore.hotelData.id;
    let channelNameChat = 'private-notify-unread-msg-hotel.' + hotelStore.hotelData.id;

    channelQuery.value = pusher.value.subscribe(channelNameQuery);
    channelQuery.value.bind('App\\Events\\NotifySendQueryEvent', async (data) => {
      // console.log('test NotifySendQueryEvent',data)
      if(data.countPendingQueries){
        countPendingQueries.value = data.countPendingQueries;
      }
      //notify the hoster
      notifyFeedback(data)
      //
    });

    channelChat.value = pusher.value.subscribe(channelNameChat);
    channelChat.value.bind('App\\Events\\NotifyUnreadMsg', async (data) => {
      // console.log('test NotifyUnreadMsg',data)
      // console.log('test NotifyUnreadMsg',authStore.user?.id)
      if(authStore.user?.id == data?.user_id){
        notifyChat(data)
      }
        
    });
    
    channelStay.value = pusher.value.subscribe(channelNameStay);
    channelStay.value.bind('App\\Events\\NotifyStayHotelEvent', async (data) => {
      // console.log('test NotifyStayHotelEvent',data)
        if('pendingCountChats' in data) countPendingChats.value = data.pendingCountChats;
    });
};




const handleMouseMove = () => {
  isMouseMoving.value = true
}

const notifyFeedback = (data) => {
  
  let currentUserid = authStore.user?.id;
  let routeData = {
    name : 'StayQueryDetail',
    params : { stayId : data.stayId },
    query : { g : data.guestId }
  };

  if(data.concept == "pending" && data.userId && data.userId == currentUserid){
    showNotification(data.title,data.text,routeData,10000);   
  }
  if(data.concept == "new"){
    showNotification(data.title,data.text,routeData,10000);   
  }
}


const notifyChat = (data) =>{
  let currentUserid = authStore.user?.id;
  if(!Number(data.automatic) && data.guest){
      let room_text =  'Estancia: nº habitación ';
      data.room ? room_text=room_text+data.room : room_text=room_text+'no asignado';
      let routeData = {
        name : 'StayChatRoom',
        params : { stayId : data.stay_id },
        query : { g : data.guest_id }
      };

      if(data.concept == "pending" && data.user_id && data.user_id == currentUserid){
        showNotification(room_text, data.text, routeData, 10000);
      }
      if(data.concept == "new"){
        showNotification(room_text, data.text, routeData, 10000);
      }
      
  }
}

const handleMenuItemClick = (nameButtom) => {
  isMouseMoving.value = false;
  if (nameButtom === 'Ayuda') {
    emit('openmodalHelp')
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
        include: ['StayHomePage','StayChatRoom','StayQueryDetail','StayDetailPage','CheckinDetail'],
        url: '/estancias',
        permissionName: 'estancias',
        subscription: true
      },
      {
        title: 'Reseñas',
        icon: '1.TH.REVIEW.MM',
        include: ['Reviews','ReviewDetail'],
        url: '/resenas',
        permissionName: 'resenas',
        subscription: true
      },
    ],
  },
  {
    title: 'Administración',
    group: [
      {
        title: 'WebApp',
        icon: '1.TH.MM.WEBAPP',
        include: [
          'ReviewRequestSettingsIndex',
          'SettingsPreStayPage',
          'SettingsStayPage',
          'SettingsPostStayPage',
          'Places',
          'Facilities',
          'Perfil',
          'Experiences',
          'WebAppHome',
          'GeneralSettings',
          'AvailabilitySettings',
          'AutomaticResponses',
          'Customization',
          'Gallery',
          //comunication
          'ComunicationHome',
          'comunicationInvitationByBooking',
          'comunicationInvitationByAirbnb',
          'comunicationInvitationByExpedia',
          'ComunicationFromPMS',
          'ComunicationSignage',
          'ComunicationFromQRTV',
          'ComunicationFromYourWeb',
          //legaltexts
          'GeneralLegal',
          'PoliciesLegal',
          'PolicyPrivacyLegal',
          'PolicyCookiesLegal',
          //checkin
          'CheckinGeneral',
          'CheckinForms',
          //others
          'Configuracion',
          'PromoteWebApp',
          'Appearence',
        ],
        url: '/webapp',
        permissionName: 'webapp',
        subscription : false
      },
      /* {
        title: 'Comunicaciones',
        icon: '1.TH.DASHBOARDNEW',
        include: ['-'],
        url: '/dashboard',
      }, */
      {
        title: 'Hoster',
        icon: '1.TH.MM.HOSTER',
        include: ['UserNotificationsSettings', 'UsersSettings','ExternalPlatforms'],
        url: '/equipo/configuracion/usuarios',
        permissionName: 'hoster'
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
    'w-0 group-hover:w-[196px] overflow-hidden transition-all duration-500 ease-in-out'
  if (displayedMenu.value) {
    withStyles = 'w-[196px]'
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
    hotelStore.loadHotelsAvailables(true);
    hotelStore.loadHotelsByUser();
    
    countPendingQueries.value = await queryStore.$countPendingByHotel();
    countPendingChats.value = await chatStore.$pendingCountByHotel();
    conuntReviewsPending.value = await reviewStore.$countReviewsPending();
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

    if (channelChat.value) {
        channelChat.value.unbind('App\\Events\\NotifyUnreadMsg');
        pusher.value.unsubscribe(channelChat.value);
    }
});

function handleMouseEnter () {
  onHoverMainMenu.value = true;
  isMouseMoving.value = true;
}

function handleMouseLeave () {
  onHoverMainMenu.value = false;
  isMouseMoving.value = false;
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

.shadow-tooltip {
  box-shadow: 0px 3.5px 7px 0px rgba(0, 0, 0, 0.15);
}

</style>
