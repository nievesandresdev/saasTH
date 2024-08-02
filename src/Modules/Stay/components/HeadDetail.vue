<template>
    <div class="px-6">
        <div class="flex items-center mt-10">
            <h1 class="text-[22px] font-medium">Estancia{{ route.params.stayId }}</h1>
            <div class="flex items-center ml-auto" v-if="session && session[0]">
                <img 
                    class="rounded-full w-8 h-8 mr-2" 
                    :src="`https://ui-avatars.com/api/?name=${session[0].userName}&color=fff&background=${session[0].userColor}`"
                >
                <h1 class="text-sm font-semibold leading-[120%] htext-green-600">En línea</h1>
            </div>
        </div>
    </div>
    <div class="pt-4 sticky top-0 left-0 bg-[#fafafa] px-6 z-50">
        <TabMenu :links="views ?? {}"/>
    </div>
</template>
<script setup>
import { ref, inject, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router';
import TabMenu from '@/components/TabMenu.vue'
import { useChatStore } from '@/stores/modules/chat/chat'
import { useHotelStore } from '@/stores/modules/hotel'
import { getPusherInstance } from '@/utils/pusherSingleton'

const chatStore = useChatStore();
const hotelStore = useHotelStore()

const route = useRoute();
const data = inject('data')
const session = inject('session');

const stayId = ref(route.params.stayId);
const views = ref([])
const countPendingChats = ref([])
const channelChat = ref(null);
const channelSession = ref(null);
const pusher = ref(null);

// watch(() => route.params.stayId, async (newId, oldId) => {
    
// }, { immediate: true });      

watch(data, async (newValue) => {
    countPendingChats.value = await chatStore.$pendingCountByStay(route.params.stayId);
    stayId.value = route.params.stayId;
    updateViews();
}, { deep: true, immediate: true });




const updateViews = () => {
    if (data.value && data.value.guests && data.value.guests.length > 0) {
        const guestId = data.value.guests[0].id;
        views.value = [
            {
                name: 'Información',
                active: route.name === 'StayDetailPage',
                viewName: 'StayDetailPage'
            },
            {
                name: 'Seguimiento',
                active: route.name === 'StayQueryDetail',
                viewName: 'StayQueryDetail',
                params: { stayId: stayId.value },
                query: { g: guestId }
            },
            {
                name: 'Chat',
                active: route.name === 'StayChatRoom',
                viewName: 'StayChatRoom',
                params: { stayId: stayId.value },
                query: { g: guestId },
                notify : countPendingChats.value > 0
            },
        ];
    }
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
        countPendingChats.value = await chatStore.$pendingCountByStay(route.params.stayId);
        updateViews();
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
