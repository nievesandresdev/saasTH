<template>
    <div class="px-2 relative">
        <p class="absolute text-center text-xs leading-[90%] font-semibold w-[100px] top-[-30px] left-[-30px]">
            Solicitud reseña en {{words[period]}}
        </p>
        <RequestRequired 
            v-if="timeLineData?.request[period]?.icon == 'Reseña solicitada'"
            :period="period"
        />
        <NotRequested 
            v-else-if="timeLineData?.request[period]?.icon == 'Reseña no solicitada'"
        />
        <DisabledRequest 
            v-else-if="timeLineData?.request[period]?.icon == 'Solicitud desactivada'"
        />
        <RequestPending v-else/>
    </div>
</template>
<script setup>
import { inject, computed } from 'vue'
import RequestPending from './Icons/RequestPending.vue';
import NotRequested from './Icons/NotRequested.vue'
import RequestRequired from './Icons/RequestRequired.vue'
import DisabledRequest from './Icons/DisabledRequest.vue'


const props = defineProps({
    period:{
        type: String,
        default:null
    }
})

const timeLineData = inject('timeLineData')

const words = {
    "pre-stay":"Pre-Stay",
    "in-stay":"Stay",
    "post-stay":"Post-Stay",
}

</script>