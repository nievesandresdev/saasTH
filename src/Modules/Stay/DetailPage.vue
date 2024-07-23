<template>
    <Head />
    <div class="p-6" v-if="data">
        <InfoSection/>
        <GuestList/>
        <NotesList/>
    </div>
</template>

<script setup>
import { ref, watch, provide, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, onBeforeRouteLeave } from 'vue-router';
import { getPusherInstance, isChannelSubscribed } from '@/utils/pusherSingleton'
//components
import Head from './components/HeadDetail.vue'
import InfoSection from './components/Detail/InfoSection.vue';
import GuestList from './components/Detail/GuestList.vue';
import NotesList from './components/Detail/NotesList.vue';
//store
import { useStayStore } from '@/stores/modules/stay/stay';

const stayStore = useStayStore();
const route = useRoute();
//pusher
const isSubscribed = ref(false);
const channel_chat = ref(null);
const pusher = ref(null);   

// Refs para reaccionar a los cambios en los parámetros o consultas
const id = ref(route.params.stayId);
const data = ref(null);
const session = ref(null);

onBeforeRouteLeave((to, from, next) => {
    updateDetailSession();
    next();
});

onMounted( async () => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    connect_pusher();
})

onBeforeUnmount(() => {
    if (channel_chat.value) {
        channel_chat.value.unbind('App\\Events\\SessionsStayEvent');
        pusher.value.unsubscribe(channel_chat.value);
    }
    window.removeEventListener('beforeunload', handleBeforeUnload);
})

const connect_pusher = () => {
    if (!isSubscribed.value) {
        const channelName = 'private-stay-sessions.' + id.value;
        if (!isChannelSubscribed(channelName)) {
            channel_chat.value = channelName;
            pusher.value = getPusherInstance();
            channel_chat.value = pusher.value.subscribe(channel_chat.value);
            channel_chat.value.bind('App\\Events\\SessionsStayEvent', async (data) => {
                console.log('pusher en accion', data)
                if(data.stayId == id.value){
                    session.value = data.session;
                }
                
            });
        isSubscribed.value = true; // Marcar como suscrito
        }
    } else if (!id.value && isSubscribed.value) {
        // Lógica para desuscribirse del canal si id.value es null o undefined
        if (channel_chat.value) {
        pusher.value.unsubscribe(channel_chat.value);
        isSubscribed.value = false; // Marcar como no suscrito
        }
    }
};


const handleBeforeUnload = async (event) => {
    delete event['returnValue'];
    await updateDetailSession();
    window.close();
}

// Function to perform asynchronous operations
const updateDetailSession = async () => {
    let user = JSON.parse(sessionStorage.getItem('user'));
    await stayStore.$deleteSession(id.value ,'sessions', user.email);
}

// Watchers para actualizaciones de URL
watch(() => route.params.stayId, async (newId, oldId) => {
    
    let user = JSON.parse(sessionStorage.getItem('user'));
    if(oldId){
        await stayStore.$deleteSession(oldId ,'sessions', user.email);
    }

    id.value = newId;
    data.value = await stayStore.$getdetailData(id.value);
    session.value = data.value?.sessions;
    await stayStore.$createSession(id.value ,'sessions', user.email, user.name, user.color)
    
}, { immediate: true });              

provide('data',data)
provide('session',session)
</script>
