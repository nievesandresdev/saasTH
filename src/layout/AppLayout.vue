<template>
    <SuscriptionBanner v-if="userStore.showSuscriptionBanner" :data="userStore.dataSubscriptionBanner" />
    <!-- <div class="px-3.5 md:px-6 h-10 w-full hbg-green-600 flex justify-between items-center">
d    dd
    </div> -->
    <div 
        class="flex" id="main-container"
        :class="userStore.showSuscriptionBanner ? 'h-with-banner' : 'h-without-banner'"
    >
        <!-- hole for collapse main sidebar -->
        <div v-if="!displayedMenu" class="w-16 flex-shrink-0 h-full"></div>
        <!-- hole for left sidebar section -->
        <div class="flex-shrink-0 h-full" :style="`width :${sidebarWidthz}`"></div>

        <!-- container side left -->
        <!-- para el menu estado desplayed se posicion sticky -->
        <aside 
            :class="`flex-shrink-0 ${displayedMenu ? 'sticky' : 'fixed'} left-0 z-[2000] flex ${userStore.showSuscriptionBanner ? 'top-10 h-with-banner' : 'top-0 h-without-banner'}`"
        >
            <MainSidebar @openmodalHelp="openModalHelp" :subscription="userStore.dataSubscriptionBanner" />
            <!-- container dinamic side left -->
            <div v-if="currentLeftSidebar" class="flex-shrink-0 h-full" :style="`width :${sidebarWidthz}`">
                <DinamicLeftSidebar 
                    :sidebarName="currentLeftSidebar"
                    :key="layoutStore.leftSidebarKey" 
                />
            </div>
        </aside>

        <!-- central container -->
        <div id="main-content" class="overflow-y-auto flex-grow h-full bg-[#FAFAFA]">
            <DinamicOverContent :headerName="componentOverContent"/>
            <router-view></router-view>
            <!-- <LoadPage v-if="activeRequests > 0" /> -->
        </div>

        <!-- side right -->
        <aside v-if="currentRightSidebar" :class="userStore.showSuscriptionBanner ? 'h-with-banner' : 'h-without-banner'">
            <DinamicRightSidebar 
                :key="layoutStore.rightSidebarKey" 
                :sidebarName="currentRightSidebar"
            />
        </aside>
    </div>
    <NotifyPanel />
    <ModalHelp ref="modalHelpRef"/>
    <SessionModal />
    <ModalInfoNewHotel />
</template>
<script setup>
import { computed, ref, provide, onMounted } from 'vue';
import { useRoute, onBeforeRouteLeave } from 'vue-router';

import ModalHelp from '../layout/components/ModalHelp.vue'
import ModalInfoNewHotel from './components/ModalInfoNewHotel.vue';
import SessionModal from './components/SessionModal.vue'
import DinamicLeftSidebar from './DinamicLeftSidebar.vue';
import DinamicRightSidebar from './DinamicRightSidebar.vue';
import DinamicOverContent from './DinamicOverContent.vue';
import MainSidebar from './MainSidebar.vue';
import SuscriptionBanner from './SuscriptionBanner.vue';
import NotifyPanel from './Notifications/NotifyPanel.vue'
import LoadPage from '@/shared/LoadPage.vue'; // Asegúrate de que la ruta sea correcta
import { usePreloaderStore } from '@/stores/modules/preloader';
import { useMockupStore } from '@/stores/modules/mockup';
import { useHotelStore } from '@/stores/modules/hotel'
import { useUserStore } from '@/stores/modules/users/users'
import { useLayoutStore } from '@/stores/modules/layout'

const mockupStore = useMockupStore();
const preloaderStore = usePreloaderStore();
const hotelStore = useHotelStore();
const userStore = useUserStore();
const layoutStore = useLayoutStore();

const activeRequests = computed(() => preloaderStore.activeRequests);
const route = useRoute();

/* const showSuscriptionBanner = ref(false);
const dataSubscriptionBanner = ref({}); */
const isNotifyPanelVisible = ref(false)
const modalHelpRef = ref(false)
const modalProfile = ref(false)
const modalInfoNewHotel = ref(false)

const currentLeftSidebar = computed(() => route.meta.sidebar);
const currentRightSidebar = computed(() => route.meta.sidebarRight);
const componentOverContent = computed(() => route.meta.componentOverContent);
const sidebarWidthz = computed(() => route.meta.sidebarWidth);
const displayedMenu = computed(() => route.meta.displayedMenu ?? false);

onBeforeRouteLeave((to, from, next) => {
    mockupStore.$resetStore();
    next();
});

const openModalHelp = () => {
  modalHelpRef.value.open();
}

onMounted(async() => {
    await userStore.$getSubscriptionStatus();
    //userStore.$getSubscriptionStatus();
})

const { hotelData, hotelsAvailables,hotelsUser,hotelsByUserAvailables,$handleDefaultHotel,loadHotelsAvailables,loadHotelsByUser } = hotelStore;



provide('isNotifyPanelVisible',isNotifyPanelVisible)
provide('modalProfile',modalProfile)
provide('modalInfoNewHotel',modalInfoNewHotel)
</script>
<style scoped>

</style>
  