<template>
    <component :is="dynamicComponent" v-bind="props" />
</template>

<script setup>
import { computed, defineProps } from 'vue';
import SettingsMenu from '@/layout/Settings/SettingsMenu.vue';
import StayList from '@/Modules/Stay/components/StayList.vue';
import SideHosterPlatform from '@/layout/Settings/SideHosterPlatform.vue';
import ReviewSiderbar from '@/layout/components/ReviewSiderbar.vue';

const props = defineProps({
    sidebarName: String
});

const componentMap = {
    SettingsMenu,
    StayList,
    SideHosterPlatform,
    ReviewSiderbar,
};

const dynamicComponent = computed(() => {
    return componentMap[props.sidebarName] || null;
});
</script>
