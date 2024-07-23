<template>
    <div class="px-2 relative">
        <p class="absolute text-center text-xs leading-[90%] font-semibold w-[100px] top-[-22px] left-[-30px]">Solicitud</p>
        <RequestRequired v-if="data?.icon == 'Solicitado'"/>
        <NotRequested v-else-if="data?.icon == 'No solicitado'"/>
        <RequestPending v-else/>
    </div>
</template>
<script setup>
import { inject, provide } from 'vue'
import RequestPending from './Icons/RequestPending.vue';
import NotRequested from './Icons/NotRequested.vue'
import RequestRequired from './Icons/RequestRequired.vue'


const timeLineData = inject('timeLineData')
const data = timeLineData?.request


</script>