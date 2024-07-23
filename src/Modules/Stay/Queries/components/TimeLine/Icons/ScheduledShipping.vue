<template>
    <div class="">
        <Tooltip
            size="s"
            :top="25"
            :left="period === 'post-stay' ? null : 0"
            :right="period === 'post-stay' ? 0 : null"
        >
            <template v-slot:button>
                <img class="w-6 h-6" src="/assets/icons/1.TH.SCHEDULECIRCLE.svg" alt="">
            </template>
            <template v-slot:content>
                <p class="text-xs font-medium">Feedback {{translatePeriod}}</p>
                <p class="text-xs mt-4">Envío programado:
                    <span class="font-medium">
                        {{$formatTimestampDate(timeLineData[period].shippingTime,'dd/MM/yyyy')}} -
                        {{$formatTimestampDate(timeLineData[period].shippingTime,'HH:mm')}}
                    </span>
                </p>
            </template>
        </Tooltip>
        <p class="absolute text-center text-xs leading-[90%] w-[130px] bottom-[-18px] left-[-45px]">Envío programado</p>
    </div>
</template>
<script setup>
import { inject, provide } from 'vue'
import Tooltip from '@/components/Tooltip.vue'

const period = inject('period')
const translatePeriod = inject('translatePeriod')
const timeLineData = inject('timeLineData')

</script>
