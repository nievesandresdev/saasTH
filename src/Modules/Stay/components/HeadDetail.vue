<template>
    <div class="px-6 relative z-[201]">
        <div class="flex items-center mt-10">
            <h1 class="text-[22px] font-medium">Estancias</h1>
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
import { ref, inject, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router';
import TabMenuContainer from '@/components/TabMenuWSlot.vue'
import TabLink from '@/components/TabMenuLink.vue'
import { useChatStore } from '@/stores/modules/chat/chat'
import { useHotelStore } from '@/stores/modules/hotel'
import { useQueryStore } from '@/stores/modules/queries/query';
import { useStayStore } from '@/stores/modules/stay/stay';
import { getPusherInstance } from '@/utils/pusherSingleton'


const queryStore = useQueryStore();

const chatStore = useChatStore();
const hotelStore = useHotelStore()
const stayStore = useStayStore();

const route = useRoute();
// const data = inject('data')
// const session = inject('session');
const user = JSON.parse(sessionStorage.getItem('user'));


const session = ref(null)
const countPendingChats = ref(0)
const countPendingQueries = ref(0)
const guestIdDefault = ref(null)
const channelChat = ref(null);
const channelSession = ref(null);
const pusher = ref(null);

watch(() => route.params.stayId, async (newId, oldId) => {
    countPendingChats.value = await chatStore.$pendingCountByStay(route.params.stayId);
    countPendingQueries.value = await queryStore.$pendingCountByStay(route.params.stayId);
    guestIdDefault.value = null;
    stayStore.$getDefaultGuestIdAndSessions(route.params.stayId).then((res)=>{
        guestIdDefault.value = res?.guests[0].guestId;
        session.value =  res?.sessions ? res?.sessions[0] : null;
    });
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
