<template>
    <div class="mt-5">
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
        name: 'General',
        active : route.name == 'GeneralSettings',
        viewName :'GeneralSettings'
    },
    {
        name: 'Disponibilidad',
        active : route.name == 'SettingsStayPage',
        viewName :'SettingsStayPage'
    },
    {
        name: 'Respuestas automáticas',
        active : route.name == 'SettingsPostStayPage',
        viewName :'SettingsPostStayPage'
    },
])
</script>