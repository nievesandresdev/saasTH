<template>
    <div class="px-6 relative z-[201]">
        <div class="flex items-center mt-10">
            <h1 class="text-[22px] font-medium">Estancia</h1>
            <div class="flex items-center ml-auto" v-if="session && session[0] && user.name !== session[0].userName">
                <img 
                    class="rounded-full w-8 h-8 mr-2" 
                    :src="`https://ui-avatars.com/api/?name=${session[0].userName}&color=fff&background=${session[0].userColor}`"
                >
                <h1 class="text-sm font-semibold leading-[120%] htext-green-600">En línea</h1>
            </div>
        </div>
    </div>
    <div class="pt-4 top-0 left-0 bg-[#fafafa] px-6 z-50 " :class="{'sticky':!loading}">
        <TabMenu :links="views"/>
    </div>
</template>
<script setup>
import { ref, inject, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router';
import TabMenu from '@/components/TabMenu.vue'
import { useChatStore } from '@/stores/modules/chat/chat'
import { useHotelStore } from '@/stores/modules/hotel'
import { useQueryStore } from '@/stores/modules/queries/query';
import { getPusherInstance } from '@/utils/pusherSingleton'


const queryStore = useQueryStore();

const chatStore = useChatStore();
const hotelStore = useHotelStore()

const route = useRoute();
const data = inject('data')
const session = inject('session');
const user = JSON.parse(sessionStorage.getItem('user'));

const views = ref([
    {
        name: 'Información',
        active: route.name == 'StayDetailPage',
        viewName: 'StayDetailPage'
    },
    {
        name: 'Seguimiento',
        active: route.name == 'StayQueryDetail',
        viewName: 'StayQueryDetail',
        params: { stayId: route.params.stayId },
        query: { g: null },
        notify : 0
    },
    {
        name: 'Chat',
        active: route.name == 'StayChatRoom',
        viewName: 'StayChatRoom',
        params: { stayId: route.params.stayId },
        query: { g: null },
        notify : 0
    },
])
const countPendingChats = ref(0)
const countPendingQueries = ref(0)
const loading = ref(true)
const channelChat = ref(null);
const channelSession = ref(null);
const pusher = ref(null);

watch(() => route.params.stayId, async (newId, oldId) => {
    loading.value = true;
    countPendingChats.value = await chatStore.$pendingCountByStay(route.params.stayId);
    countPendingQueries.value = await queryStore.$pendingCountByStay(route.params.stayId);
    updateViews();
}, { immediate: true });      

const updateViews = () => {
    loading.value = true;
    if (data.value && data.value.guests && data.value.guests.length > 0) {
        const guestId = data.value.guests[0].id;
        // Actualizar solo las propiedades necesarias
        views.value.forEach(view => {
            if (view.viewName === 'StayQueryDetail' || view.viewName === 'StayChatRoom') {
                // Actualizar el parámetro 'g' y 'notify' específicamente
                view.query.g = guestId;
                if (view.viewName === 'StayQueryDetail') {
                    view.notify = countPendingQueries.value > 0;
                }
                if (view.viewName === 'StayChatRoom') {
                    view.notify = countPendingChats.value > 0;
                }
            }
        });
    }
    loading.value = false;
};



const connectPusher = () =>{
    /*
    //PUSHER
    */
    channelChat.value = 'private-noti-hotel.' + hotelStore.hotelData.id;
    channelSession.value = 'private-stay-sessions-hotel.' + hotelStore.hotelData.id;
    
    // Pusher.logToConsole = true;
    pusher.value = getPusherInstance();
    channelChat.value = pusher.value.subscribe(channelChat.value);
    channelChat.value.bind('App\\Events\\NotifyStayHotelEvent', async (data) => {
        console.log('NotifyStayHotelEvent headstay',data)
        if(data.stayId == route.params.stayId){
            if('pendingCountChats' in data) countPendingChats.value = data.pendingCountChats;
            if('pendingCountQueries' in data) countPendingQueries.value = data.pendingCountQueries;
            updateViews();
        }
    });
    channelSession.value = pusher.value.subscribe(channelSession.value);
    channelSession.value.bind('App\\Events\\SessionsStayEvent', async (data) => {
        console.log('SessionsStayEvent',data)
        console.log('SessionsStayEvent stayId',route.params.stayId)
        if(Number(data.stayId) == Number(route.params.stayId)){
            console.log('SessionsStayEvent entro')
            session.value = data.session;
        }
    });
}

onMounted( async() => {
    connectPusher();
    // countPendingChats.value = await chatStore.$pendingCountByStay(route.params.stayId);
    // countPendingQueries.value = await queryStore.$pendingCountByStay(route.params.stayId);
})

onUnmounted(() => {
    if (channelChat.value) {
        channelChat.value.unbind('App\\Events\\NotifyStayHotelEvent');
        pusher.value.unsubscribe(channelChat.value);
    }
    if (channelSession.value) {
        channelSession.value.unbind('App\\Events\\SessionsStayEvent');
        pusher.value.unsubscribe(channelSession.value);
    }
});
</script>
