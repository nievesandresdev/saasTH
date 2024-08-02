<template>
    <Head />
    <div class="p-6" v-if="data">
        <div class="3xl:flex 3xl:items-start 3xl:gap-6">
            <InfoSection/>
            <GuestList/>
        </div>
        <NotesList/>
    </div>
</template>

<script setup>
import { ref, watch, provide, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, onBeforeRouteLeave } from 'vue-router';
//components
import Head from './components/HeadDetail.vue'
import InfoSection from './components/Detail/InfoSection.vue';
import GuestList from './components/Detail/GuestList.vue';
import NotesList from './components/Detail/NotesList.vue';
//store
import { useStayStore } from '@/stores/modules/stay/stay';

const stayStore = useStayStore();
const route = useRoute();
// Refs para reaccionar a los cambios en los parámetros o consultas
const id = ref(route.params.stayId);
const data = ref(null);
const session = ref(null);

onBeforeRouteLeave((to, from, next) => {
    if (!['StayDetailPage', 'StayQueryDetail', 'StayChatRoom'].includes(to.name)) {
        // Ejecutar `deleteSession` solo si la ruta de destino no está en el array allowedRoutes
        deleteSession();
    }
    next();
});

onMounted( async () => {
    window.addEventListener('beforeunload', handleBeforeUnload);
 
})

onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
})


const handleBeforeUnload = (event) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    stayStore.$deleteSessionWithApiKey(route.params.stayId, user.email)
    delete event['returnValue']; // Evitar la alerta del navegador
}


// Function to perform asynchronous operations
const deleteSession = async () => {
    let user = JSON.parse(sessionStorage.getItem('user'));
    await stayStore.$deleteSession(route.params.stayId ,'sessions', user.email);
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
    await stayStore.$createSession(id.value ,'sessions')
    
}, { immediate: true });              

provide('data',data)
provide('session',session)
</script>
