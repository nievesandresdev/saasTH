<template>
    <div class="px-6">
        <div class="flex items-center mt-10">
            <h1 class="text-[22px] font-medium">Estancia</h1>
            <div class="flex items-center ml-auto" v-if="session && session[0]">
                <img 
                    class="rounded-full w-8 h-8 mr-2" 
                    :src="`https://ui-avatars.com/api/?name=${session[0].userName}&color=fff&background=${session[0].userColor}`"
                >
                <h1 class="text-sm font-semibold leading-[120%] htext-green-600">En línea</h1>
            </div>
        </div>
    </div>
    <div class="pt-4 sticky top-0 left-0 bg-white px-6 z-50">
        <TabMenu :links="views"/>
    </div>
</template>
<script setup>
import { ref, inject } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute();

const session = inject('session');

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