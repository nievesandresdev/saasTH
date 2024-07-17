<template>
    <SuscriptionBanner v-if="showSuscriptionBanner" />
    <!-- <div class="px-3.5 md:px-6 h-10 w-full hbg-green-600 flex justify-between items-center">
d    dd
    </div> -->
    <div 
        class="flex" id="main-container"
        :class="showSuscriptionBanner ? 'h-with-banner' : 'h-without-banner'"
    >
        <!-- hole for collapse main sidebar -->
        <div v-if="!displayedMenu" class="w-16 flex-shrink-0 h-full"></div>
        <!-- hole for left sidebar section -->
        <div class="flex-shrink-0 h-full" :style="`width :${sidebarWidthz}`"></div>

        <!-- container side left -->
        <!-- para el menu estado desplayed se posicion sticky -->
        <aside 
            :class="`flex-shrink-0 ${displayedMenu ? 'sticky' : 'fixed'} left-0 z-[2000] flex ${showSuscriptionBanner ? 'top-10 h-with-banner' : 'top-0 h-without-banner'}`"
        >
            <MainSidebar />
            <!-- container dinamic side left -->
            <div v-if="currentLeftSidebar" class="flex-shrink-0 h-full" :style="`width :${sidebarWidthz}`">
                <DinamicLeftSidebar :sidebarName="currentLeftSidebar"/>
            </div>
        </aside>

        <!-- central container -->
        <div id="main-content" class="overflow-y-auto flex-grow h-full">
            <router-view></router-view>
        </div>

        <!-- side right -->
        <aside v-if="currentRightSidebar" class="h-full">
            <DinamicRightSidebar :sidebarName="currentRightSidebar"/>
        </aside>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import DinamicLeftSidebar from './DinamicLeftSidebar.vue';
import DinamicRightSidebar from './DinamicRightSidebar.vue';
import MainSidebar from './MainSidebar.vue';
import SuscriptionBanner from './SuscriptionBanner.vue';


const route = useRoute();

const showSuscriptionBanner = false;

const currentLeftSidebar = computed(() => route.meta.sidebar);
const currentRightSidebar = computed(() => route.meta.sidebarRight);
const sidebarWidthz = computed(() => route.meta.sidebarWidth);
const displayedMenu = computed(() => route.meta.displayedMenu ?? false);
</script>
<style scoped>
.h-without-banner{
    height: 100vh;
}
.h-with-banner{
    height: calc(100vh - 40px);
}
</style>
  