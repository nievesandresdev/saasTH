<template>
    <div class="px-6 z-[300] relative">
        <h1 class="py-5 text-[22px] font-medium leading-[110%]">Seguimiento - Feedback</h1>
        <TabMenu :links="views"/>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute();

import TabMenu from '@/components/TabMenu.vue'

const views = ref([
    {
        name: 'Pre-Stay',
        active : route.name == 'SettingsPreStayPage',
        viewName :'SettingsPreStayPage'
    },
    {
        name: 'Stay',
        active : route.name == 'SettingsStayPage',
        viewName :'SettingsStayPage'
    },
    {
        name: 'Post-Stay',
        active : route.name == 'SettingsPostStayPage',
        viewName :'SettingsPostStayPage'
    },
])
</script>