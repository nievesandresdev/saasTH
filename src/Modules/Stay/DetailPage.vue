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
const id = ref(route.params.id);
const data = ref(null);
const test = ref(false);
provide('test',test)
const searchQuery = ref(route.query.search);

onBeforeRouteLeave((to, from, next) => {
    updateDetailSession();
    next();
});

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload);
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
})

// Handler for beforeunload event
const handleBeforeUnload = async (event) => {
    delete event['returnValue'];
    await updateDetailSession();
    window.close();
}

// Function to perform asynchronous operations
const updateDetailSession = async () => {
    await stayStore.$updateData({sessions:'ultima',stayId:id.value});
}

// Watchers para actualizaciones de URL
watch(() => route.params.id, async (newId) => {
    id.value = newId;
    data.value = await stayStore.$getdetailData(id.value);
    // console.log('data.value',data.value)
}, { immediate: true });              

watch(() => route.query.search, (newSearch) => {
    searchQuery.value = newSearch;
}, { immediate: true });

provide('data',data)
</script>
