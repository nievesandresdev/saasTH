<template>
    <div class="" v-if="timeLineData">
        <Tooltip
            size="s"
            :top="25"
            :left="period === 'post-stay' ? null : 0"
            :right="period === 'post-stay' ? 0 : null"
        >
            <template v-slot:button>
                <img
                    v-if=" timeLineData[period].feeling"
                    class="w-6 h-6"
                    :src="`/assets/icons/emojis/colors/1.TH.Emojis${ timeLineData[period].feeling}.svg`"
                >
                <img v-else class="w-6 h-6" src="/assets/icons/Time-line-icons-check.svg" alt="">
            </template>
            <template v-slot:content>
                <p class="text-xs font-medium">Feedback {{translatePeriod}}</p>
                <p class="text-xs mt-4">Envío:
                    <span class="font-medium">
                        {{$formatTimestampDate(timeLineData[period].shippingTime,'dd/MM/yyyy')}} - 
                        {{$formatTimestampDate(timeLineData[period].shippingTime,'HH:mm')}}
                    </span>
                </p>
                <p class="text-xs mt-2">Respondido:
                    <span class="font-medium">
                        {{$formatTimestampDate(timeLineData[period].answeredTime,'dd/MM/yyyy')}} - 
                        {{$formatTimestampDate(timeLineData[period].answeredTime,'HH:mm')}}
                    </span>
                </p>
                <router-link 
                    class="text-xs mt-2 underline block"
                    :to="{ 
                        name:'StayQueryDetail', 
                        params: {stayId: route.params.stayId}, 
                        query:  {g: route.query.g}, 
                        hash: '#'+translatePeriod
                    }"
                >
                    Feedback obtenido en {{translatePeriod}}
                </router-link>
            </template>
        </Tooltip>
        <p class="absolute text-center text-xs leading-[90%] w-[130px] bottom-[-18px] left-[-45px]">Respondido</p>
    </div>
</template>
<script setup>
import { inject, provide } from 'vue'
import Tooltip from '@/components/Tooltip.vue'
import { useRoute } from 'vue-router'
const period = inject('period')
const timeLineData = inject('timeLineData')
const translatePeriod = inject('translatePeriod')

const route = useRoute();
// const feelingIcons = {
//     "WRONG":"Pre-Stay",
//     "NORMAL":"Stay",
//     "GOOD":"Post-Stay",
// }

</script>
