<template>
    <div class="px-6">
        <h1 class="text-[22px] font-medium mt-10">Estancia</h1>
        <div class="mt-4">
            <TabMenu :links="views"/>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute();

import TabMenu from '@/components/TabMenu.vue'

const views = ref([
    {
        name: 'Información',
        active : route.name == 'StayDetailPage',
        viewName :'StayDetailPage'
    },
    {
        name: 'Seguimiento',
        active : route.name == '-',
        viewName :'StayDetailPage'
    },
    {
        name: 'Chat',
        active : route.name == '-',
        viewName :'StayDetailPage'
    },
])
</script>