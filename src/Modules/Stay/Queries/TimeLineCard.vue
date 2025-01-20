<template>
    <section class="pt-6 px-6" v-if="timeLineData">
        <div class="rounded-[10px] bg-white pb-[33px]">
            <p class="text-sm leading-[90%]">
                <span class="font-bold">Sentimiento del huésped:</span>
                <template v-if="timeLineData[timeLineData.currentPeriod].feeling">
                    {{queryQualificationText[timeLineData.currentPeriod][timeLineData[timeLineData.currentPeriod].feeling]}}    
                </template>
                <template v-else>
                    Aún por determinar
                </template>
            </p>
            <p class="text-xs leading-[90%] mt-2" v-if="guestAccess?.created_at">
                <span class="font-semibold">Primer acceso WebApp:</span>
                {{$formatTimestampDate(guestAccess?.created_at,'dd/MM/yyyy')}} - 
                {{$formatTimestampDate(guestAccess?.created_at,'HH:mm')}}
            </p>
            <!-- time-line -->
            <div class="flex items-start gap-2 mt-4">
                <CurrentFeeling />
                <div class="mt-[30px] flex items-center relative px-[36px] flex-grow">
                    <PeriodNode period="pre-stay" />
                        <!-- <LineInProccess v-if="timeLineData.currentPeriod == 'pre-stay'"/>
                        <LineComplete v-else /> -->
                        <LinePending v-if="timeLineData.currentPeriod == 'pre-stay'"/>
                        <LineComplete v-else />
                    <PeriodNode period="in-stay" />
                        <LineComplete v-if="timeLineData.currentPeriod !== 'pre-stay'"/>
                        <LinePending v-else/>
                    <RequestNode period="in-stay" />
                        <!-- <LineInProccess v-if="timeLineData.currentPeriod == 'in-stay'"/>
                        <LinePending v-else-if="timeLineData.currentPeriod == 'pre-stay'" />
                        <LineComplete v-else/> -->
                        <LineComplete v-if="timeLineData.currentPeriod !== 'pre-stay' || currentQuery?.period == 'in-stay' && currentQuery?.answered"/>
                        <LinePending v-else/>
                    <PeriodNode period="post-stay" />
                        <!-- <LineComplete v-if="queryPostStay?.answered"/>
                        <LineInProccess v-else-if="timeLineData.currentPeriod == 'post-stay' || timeLineData.currentPeriod == 'invalid-stay'"/>
                        <LinePending v-else /> -->
                        <LineComplete v-if="
                            timeLineData.currentPeriod == 'invalid-stay' ||
                            currentQuery?.period == 'post-stay' && currentQuery?.answered"/>
                        <LinePending v-else/>
                    <RequestNode period="post-stay" />
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { inject, computed } from 'vue'
import CurrentFeeling from './components/TimeLine/CurrentFeeling.vue'
import LineComplete from './components/TimeLine/LineComplete.vue'
import LineInProccess from './components/TimeLine/LineInProccess.vue'
import LinePending from './components/TimeLine/LinePending.vue'
import PeriodNode from './components/TimeLine/PeriodNode.vue'
import RequestNode from './components/TimeLine/RequestNode.vue'

const guestAccess = inject('guestAccess')
const queryPostStay = inject('queryPostStay')
const timeLineData = inject('timeLineData');
const currentQuery = inject('currentQuery');


const queryQualificationText = {
    "in-stay": {
        "VERYWRONG": "Muy malo",
        "WRONG": "Malo",
        "NORMAL": "Normal",
        "GOOD": "Bueno",
        "VERYGOOD": "Muy bueno",
    },
    "post-stay": {
        "VERYWRONG": "Muy mala",
        "WRONG": "Mala",
        "NORMAL": "Normal",
        "GOOD": "Buena",
        "VERYGOOD": "Muy buena",
    }
}

</script>
