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
        <TabMenu :links="views ?? {}"/>
    </div>
</template>
<script setup>
import { ref, inject, watch } from 'vue'
import { useRoute } from 'vue-router';
import TabMenu from '@/components/TabMenu.vue'

const route = useRoute();
const data = inject('data')
const session = inject('session');

const stayId = ref(route.params.stayId);
const views = ref([])

watch(data, (newValue) => {
    if (newValue && newValue.guests && newValue.guests.length > 0) {
        const guestId = newValue.guests[0].id;
        views.value = [
            {
                name: 'Información',
                active: route.name == 'StayDetailPage',
                viewName: 'StayDetailPage'
            },
            {
                name: 'Seguimiento',
                active: route.name == 'StayQueryDetail',
                viewName: 'StayQueryDetail',
                params: { stayId: stayId.value},
                query: { g: guestId }
            },
            {
                name: 'Chat',
                active: route.name == 'StayChatRoom',
                viewName: 'StayChatRoom',
                params: { stayId: stayId.value},
                query: { g: guestId }
            },
        ];
    }
}, { deep: true, immediate: true });

</script>
