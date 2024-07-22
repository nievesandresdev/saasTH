<template>
    <Head />
   
</template>
<script setup>
import { ref, onMounted, watch, provide } from 'vue';
import { useRoute } from 'vue-router';
import Head from '../components/HeadDetail.vue'

//store
import { useStayStore } from '@/stores/modules/stay/stay';

const stayStore = useStayStore();

const route = useRoute();

const data = ref({
    guests:[]
})
onMounted(async() => {
    data.value.guests = await stayStore.$getGuestListWithNoti(route.params.stayId)
    console.log('data.value',data.value)
})

// watch(() => route.query.g, async (newId) => {
//     data.value = await stayStore.$getDetailQueryByGuest(stayId.value,newId);
// }, { immediate: true });  
provide('data',data)
</script>
