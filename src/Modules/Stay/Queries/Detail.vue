<template>
    <Head />
    <section class="mt-6 px-6">
        <GuestTabs/>
    </section>

    <section class="mx-6 pb-6 mb-10 shadow-hoster rounded-b-[10px] bg-white">
        <TimeLineCard />

        <div class="mt-6 px-6" v-if="timeLineData">
            <div class="mt-6" v-for="query in data?.queryByGuest">
                <ResponseCard v-if="query.answered" :data="query" :stay="timeLineData?.stay"/>
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref, onMounted, watch, provide } from 'vue';
import { useRoute, onBeforeRouteLeave } from 'vue-router';
import Head from '../components/HeadDetail.vue'
import TimeLineCard from './TimeLineCard.vue'
import GuestTabs from './components/GuestTabs.vue'
import ResponseCard from './ResponseCard.vue'
//store
import { useStayStore } from '@/stores/modules/stay/stay';

const stayStore = useStayStore();
const route = useRoute();

const stayId = ref(route.params.stayId);
const guestId = ref(route.query.g);
const data = ref(null);
const guestAccess = ref(null);
const timeLineData = ref(null);

onMounted(async() => {
    data.value = await stayStore.$getDetailQueryByGuest(stayId.value,guestId.value);
})

onBeforeRouteLeave((to, from, next) => {
    if (!['StayDetailPage', 'StayQueryDetail', 'StayChatRoom'].includes(to.name)) {
        // Ejecutar `updateDetailSession` solo si la ruta de destino no está en el array allowedRoutes
        updateDetailSession();
    }
    next();
});

watch(() => data.value, async (newData) => {
    guestAccess.value = newData?.timeline?.guestAccess;
    timeLineData.value = newData?.timeline;
}, { immediate: true });  

watch(() => route.query.g, async (newId) => {
    data.value = await stayStore.$getDetailQueryByGuest(stayId.value,newId);
}, { immediate: true });  


const updateDetailSession = async () => {
    let user = JSON.parse(sessionStorage.getItem('user'));
    await stayStore.$deleteSession(stayId.value ,'sessions', user.email);
}

provide('data',data)
provide('timeLineData',timeLineData);
provide('guestAccess',guestAccess)
provide('currentPeriod',timeLineData.value?.currentPeriod)
</script>
