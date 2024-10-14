<template>
    <!-- <Head /> -->
    <div class="p-6 z-[300]" v-if="data">
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
import InfoSection from './components/Detail/InfoSection.vue';
import GuestList from './components/Detail/GuestList.vue';
import NotesList from './components/Detail/NotesList.vue';
//store
import { useStayStore } from '@/stores/modules/stay/stay';
import { useStaySessionsStore } from '@/stores/modules/stay/staySessions';

const stayStore = useStayStore();
const staySessionsStore = useStaySessionsStore();

const route = useRoute();
// Refs para reaccionar a los cambios en los parámetros o consultas
const id = ref(route.params.stayId);
const data = ref(null);
const session = ref(null);

// Watchers para actualizaciones de URL
watch(() => route.params.stayId, async (newId, oldId) => {
    if(newId){
        data.value = await stayStore.$getdetailData(newId);
    }
}, { immediate: true });              

//eliminar sesion cuando salga del detalle de la estancia
onBeforeRouteLeave((to, from, next) => {
    if (!['StayDetailPage', 'StayQueryDetail', 'StayChatRoom'].includes(to.name)) {
        // Ejecutar `deleteSession` solo si la ruta de destino no está en el array allowedRoutes
        deleteSession();
    }
    next();
});

const deleteSession = async () => {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
        await staySessionsStore.$deleteSession(route.params.stayId ,'sessions', user.email);
    }
}
provide('data',data)
// provide('session',session)
</script>
