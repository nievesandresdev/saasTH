<template>
    <Head />
    <div class="p-6">
        <InfoSection v-if="data" :data="data" />
    </div>
</template>

<script setup>
import { ref, watch, provide } from 'vue';
import { useRoute } from 'vue-router';
//components
import Head from './components/HeadDetail.vue'
import InfoSection from './components/Detail/InfoSection.vue';
//store
import { useStayStore } from '@/stores/modules/stay/stay';

const stayStore = useStayStore();
const route = useRoute();

// Refs para reaccionar a los cambios en los parámetros o consultas
const id = ref(route.params.id);
const data = ref(null);
const searchQuery = ref(route.query.search);


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
