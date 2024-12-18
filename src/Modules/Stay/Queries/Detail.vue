<template>
    <!-- <Head /> -->
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
import { ref, onMounted, watch, provide, onBeforeUnmount } from 'vue';
import { useRoute, onBeforeRouteLeave } from 'vue-router';
// import Head from '../components/HeadDetail.vue'
import TimeLineCard from './TimeLineCard.vue'
import GuestTabs from './components/GuestTabs.vue'
import ResponseCard from './ResponseCard.vue'
//store
import { useStayStore } from '@/stores/modules/stay/stay';
import { useStaySessionsStore } from '@/stores/modules/stay/staySessions';


const stayStore = useStayStore();
const staySessionsStore = useStaySessionsStore();

const route = useRoute();

const stayId = ref(route.params.stayId);
const guestId = ref(route.query.g);
const data = ref(null);
const guestAccess = ref(null);
const timeLineData = ref(null)
const currentQuery = ref(null)
const session = ref(null);

onMounted(async() => {
    data.value = await stayStore.$getDetailQueryByGuest(stayId.value,guestId.value);
    console.log('test data',data.value)
})


onBeforeRouteLeave((to, from, next) => {
    if (
        !['StayDetailPage', 'StayQueryDetail', 'StayChatRoom'].includes(to.name) || 
        to.params.stayId !== from.params.stayId && to.name == 'StayDetailPage' 
    ) {
        // Ejecutar `deleteSession`  si la ruta de destino no está en el array allowedRoutes
        // o ejecutar deleteSession si esta ingresando a otra estancia
        deleteSession();
    }
    next();
});

watch(() => data.value, async (newData) => {
    guestAccess.value = newData?.timeline?.guestAccess;
    timeLineData.value = newData?.timeline;
    console.log('test timeLineData',timeLineData.value)
    currentQuery.value = newData?.queryByGuest.find(query => query.period == newData?.timeline?.currentPeriod);
}, { immediate: true });  

watch(() => route.query.g, async (newId) => {
    data.value = await stayStore.$getDetailQueryByGuest(stayId.value,newId);
}, { immediate: true });  


const deleteSession = async () => {
    let user = JSON.parse(localStorage.getItem('user'));
    await staySessionsStore.$deleteSession(route.params.stayId ,'sessions', user.email);
}

provide('data',data)
provide('timeLineData',timeLineData);
provide('guestAccess',guestAccess)
provide('currentPeriod',timeLineData.value?.currentPeriod)
provide('currentQuery',currentQuery)
provide('session',session) // se define para porder ser usada en la cabecera
</script>
