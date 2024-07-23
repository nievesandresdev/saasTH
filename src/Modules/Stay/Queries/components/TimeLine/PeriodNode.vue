<template>
    <div class="px-2 relative">
        <p class="absolute text-center text-xs leading-[90%] font-semibold w-[100px] top-[-30px] left-[-30px]"> Feedback en {{ words[period] }}</p>

        <NotResponse v-if="timeLineData && timeLineData[period]?.icon == 'No respondido'"/>
        <Disabled v-if="timeLineData && timeLineData[period]?.icon == 'Desactivado'" />
        <NotSent v-if="timeLineData && timeLineData[period]?.icon == 'No enviado' || timeLineData && timeLineData[period]?.icon == 'Error'"  />
        <ScheduledShipping v-if="timeLineData && timeLineData[period]?.icon == 'Envío programado'" />
        <WaitingAnswer v-if="timeLineData && timeLineData[period]?.icon == 'Esperando respuesta'" />
        <Answered v-if="timeLineData && timeLineData[period]?.icon == 'Respondido'" />

    </div>
</template>
<script setup>
import { inject, provide } from 'vue'
import NotResponse from './Icons/NotResponse.vue'
import Disabled from './Icons/Disabled.vue'
import NotSent from './Icons/NotSent.vue'
import ScheduledShipping from './Icons/ScheduledShipping.vue'
import WaitingAnswer from './Icons/WaitingAnswer.vue'
import Answered from './Icons/Answered.vue'
const props = defineProps({
    period:{
        type: String,
        default:null
    }
})

const words = {
    "pre-stay":"Pre-Stay",
    "in-stay":"Stay",
    "post-stay":"Post-Stay",
}

const translatePeriod = words[props.period];

provide('period',props.period);
provide('translatePeriod',translatePeriod)
const timeLineData = inject('timeLineData');




</script>
