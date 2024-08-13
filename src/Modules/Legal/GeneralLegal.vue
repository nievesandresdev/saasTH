<template>
    <div class="h-screen px-[24px] bg-[#FAFAFA]">
        <HeadLegal />
        <TabLegal />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
// COMPONENTS
import { useMockupStore } from '@/stores/modules/mockup';
import HeadLegal from './components/HeadLegal.vue';
import TabLegal from './components/TabLegal.vue';

const mockup = useMockupStore();

onMounted(()=>{
    mockup.$setIframeUrl('')
    //mockup.$setInfo1('Guarda para ver tus cambios en tiempo real', '/assets/icons/1.TH.EDIT.OUTLINED.svg')
})



</script>

<style scoped>

</style>
