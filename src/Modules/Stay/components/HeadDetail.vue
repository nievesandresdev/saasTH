<template>
    <div class="px-6 relative z-[201]">
        <div class="flex items-center mt-10">
            <h1 class="text-[22px] font-medium">Estancia</h1>
            <div class="flex items-center ml-auto" v-if="session && user.name !== session.userName">
                <img 
                    class="rounded-full w-8 h-8 mr-2" 
                    :src="`https://ui-avatars.com/api/?name=${session.userName}&color=fff&background=${session.userColor}`"
                >
                <h1 class="text-sm font-semibold leading-[120%] htext-green-600">En línea</h1>
            </div>
        </div>
    </div>
    <div class="pt-4 top-0 left-0 bg-[#fafafa] px-6 z-50">
        <TabMenuContainer>
            <TabLink
                label="Información"
                :loading=" guestIdDefault ? false : true"
                viewName="StayDetailPage"
                :selected="route.name == 'StayDetailPage'"
                :notify="false"
            />
            <TabLink
                v-if="atLeastOneCheckin.length"
                label="Registros"
                :loading=" guestIdDefault ? false : true"
                :params="{ stayId: route.params.stayId}"
                :query="{ g: atLeastOneCheckin[0].guestId }"
                viewName="CheckinDetail"
                :selected="route.name == 'CheckinDetail'"
                :notify="false"
            />
            <TabLink
                label="Seguimiento"
                :loading=" guestIdDefault ? false : true"
                viewName="StayQueryDetail"
                :params="{ stayId: route.params.stayId }"
                :query="{ g: guestIdDefault }"
                :notify="countPendingQueries > 0"
                :selected="route.name == 'StayQueryDetail'"
            />
            <TabLink
                label="Chat"
                :loading=" guestIdDefault ? false : true"
                :viewName="'StayChatRoom'"
                :params="{ stayId: route.params.stayId }"
                :query="{ g: guestIdDefault }"
                :notify="countPendingChats > 0"
                :selected="route.name == 'StayChatRoom'"
            />
        </TabMenuContainer>
    </div>

</template>
<script setup>
import { ref, inject, watch, onMounted, onUnmounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router';
import TabMenuContainer from '@/components/TabMenuWSlot.vue'
import TabLink from '@/components/TabMenuLink.vue'
import { useChatStore } from '@/stores/modules/chat/chat'
import { useHotelStore } from '@/stores/modules/hotel'
import { useQueryStore } from '@/stores/modules/queries/query';
import { useStaySessionsStore } from '@/stores/modules/stay/staySessions';
import { getPusherInstance } from '@/utils/pusherSingleton'


const queryStore = useQueryStore();

const chatStore = useChatStore();
const hotelStore = useHotelStore()
const staySessionsStore = useStaySessionsStore();

const route = useRoute();
// const data = inject('data')
// const session = inject('session');
const user = JSON.parse(localStorage.getItem('user'));


const session = ref(null)
const countPendingChats = ref(0)
const countPendingQueries = ref(0)
const guestIdDefault = ref(null)
const channelChat = ref(null);
const channelSession = ref(null);
const pusher = ref(null);
const atLeastOneCheckin = ref([]);

watch(() => route.params.stayId, async (newId, oldId) => {
    countPendingChats.value = await chatStore.$pendingCountByStay(route.params.stayId);
    countPendingQueries.value = await queryStore.$pendingCountByStay(route.params.stayId);
    guestIdDefault.value = null;
    staySessionsStore.$getDefaultGuestIdAndSessions(route.params.stayId).then((res)=>{
        
        atLeastOneCheckin.value = res?.guests.filter(g => Boolean(g.complete_checkin_data));
        guestIdDefault.value = res?.guests[0].guestId; 
        session.value =  res?.sessions ? res?.sessions[0] : null;
    });

    let user = JSON.parse(localStorage.getItem('user'));
    if(oldId && newId){
        await staySessionsStore.$deleteSession(oldId ,'sessions', user.email);
    }
    if(newId){
        await staySessionsStore.$createSession(newId ,'sessions')
    }
    
    // updateDefaultGuest();
}, { immediate: true });      

// const updateDefaultGuest = () => {
    // if (data?.value && data?.value.guests && data?.value.guests.length > 0) {
    //     guestIdDefault.value = data?.value.guests[0].id;
    // }
// };

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
        // console.log('chat NotifyStayHotelEvent',data)
        if(data.stayId == route.params.stayId){
            if('pendingCountChats' in data) countPendingChats.value = data.pendingCountChats;
            if('pendingCountQueries' in data) countPendingQueries.value = data.pendingCountQueries;
        }
    });
    channelSession.value = pusher.value.subscribe(channelSession.value);
    channelSession.value.bind('App\\Events\\SessionsStayEvent', async (data) => {
        // console.log('chat SessionsStayEvent',data)
        if(Number(data.stayId) == Number(route.params.stayId)){
            session.value = data.session[0];
        }
    });
}

const handleBeforeUnload = (event) => {
    const user = JSON.parse(localStorage.getItem('user'));
    staySessionsStore.$deleteSessionWithApiKey(route.params.stayId, user.email)
    delete event['returnValue']; // Evitar la alerta del navegador
}

onMounted( async() => {
    connectPusher();
    window.addEventListener('beforeunload', handleBeforeUnload);
})

onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
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
