<template>
    <div 
        id="main-container"
            class="h-without-banner flex"
    >
        <!-- hole for collapse main sidebar -->
        <div class="w-16 flex-shrink-0 h-full"></div>
        <!-- hole for left sidebar section -->
        <div class="flex-shrink-0 h-full" :style="`width :${sidebarWidthz}`"></div>

        <!-- container side left -->
        <aside class="h-without-banner flex-shrink-0 fixed top-0 left-0 z-[500] flex">
            <MainSidebar />
            <!-- container dinamic side left -->
            <div v-if="currentLeftSidebar" class="flex-shrink-0 h-full" :style="`width :${sidebarWidthz}`">
                <DinamicLeftSidebar :sidebarName="currentLeftSidebar"/>
            </div>
        </aside>

        <!-- central container -->
        <div id="main-content" class="overflow-y-auto flex-grow">
            <router-view></router-view>
        </div>

        <!-- side right -->
        <aside v-if="currentRightSidebar" class="h-without-banner">
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

const route = useRoute();

const currentLeftSidebar = computed(() => route.meta.sidebar);
const currentRightSidebar = computed(() => route.meta.sidebarRight);
const sidebarWidthz = computed(() => route.meta.sidebarWidth);
</script>
<style scoped>
.h-without-banner{
    height: 100vh;
}
</style>
  