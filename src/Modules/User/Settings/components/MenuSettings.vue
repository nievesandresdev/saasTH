<template>
    <div>
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
        name: 'Usuarios',
        active : route.name == 'UsersSettings',
        viewName :'UsersSettings'
    },
    {
        name: 'Notificaciones',
        active : route.name == 'UserNotificationsSettings',
        viewName :'UserNotificationsSettings'
    }
])
</script>