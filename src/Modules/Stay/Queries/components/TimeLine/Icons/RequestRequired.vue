<template>
    <div class="">
        <Tooltip
            size="s"
            :top="25"
            :right="0"
        >
            <template v-slot:button>
                <img class="w-6 h-6" src="/assets/icons/Time-line-icons-check.svg" alt="">            
            </template>
            <template v-slot:content>
                <p class="text-xs font-medium">Solicitud de reseña</p>
                <p class="text-xs mt-4">Envío: 
                    <span class="font-medium">
                    {{$formatTimestampDate(timeLineData?.request[period]?.answeredTime,'dd/MM/yyyy')}} -
                    {{$formatTimestampDate(timeLineData?.request[period]?.answeredTime,'HH:mm')}}
                    </span>
                </p>
            </template>
        </Tooltip>
        <p class="absolute text-center text-xs leading-[90%] w-[130px] bottom-[-18px] left-[-45px]">Reseña solicitada</p>
    </div>
</template>
<script setup>
import { inject, provide } from 'vue'
import Tooltip from '@/components/Tooltip.vue'
const timeLineData = inject('timeLineData')

const props = defineProps({
    period:{
        type: String,
        default:null
    }
})
</script>