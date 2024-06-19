<template>
    <SuscriptionBanner v-if="showSuscriptionBanner" />
    <div 
        class="flex" id="main-container"
        :class="showSuscriptionBanner ? 'h-with-banner' : 'h-without-banner'"
    >
        <!-- hole for collapse main sidebar -->
        <div class="w-16 flex-shrink-0 h-full"></div>
        <!-- hole for left sidebar section -->
        <div class="flex-shrink-0 h-full" :style="`width :${sidebarWidthz}`"></div>

        <!-- container side left -->
        <aside 
            class="flex-shrink-0 fixed left-0 z-[500] flex"
            :class="showSuscriptionBanner ? 'top-10 h-with-banner' : 'top-0 h-without-banner'"
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
</script>
<style scoped>
.h-without-banner{
    height: 100vh;
}
.h-with-banner{
    height: calc(100vh - 40px);
}
</style>
  