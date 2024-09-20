<template>
    <section class="pt-6 px-6">
        <div class="rounded-[10px] bg-white pb-[33px]">
            <p class="text-xs leading-[90%]" v-if="guestAccess?.created_at">
                <span class="font-semibold">Primer acceso WebApp:</span>
                {{$formatTimestampDate(guestAccess?.created_at,'dd/MM/yyyy')}} - 
                {{$formatTimestampDate(guestAccess?.created_at,'HH:mm')}}
            </p>
            <!-- time-line -->
            <div class="mt-[45px] flex items-center relative px-[8px]">
                <ReserveNode />
                <LineComplete />
                <PeriodNode period="pre-stay" />
                <LineInProccess v-if="currentPeriod == 'pre-stay'"/>
                <LineComplete v-else />
                <PeriodNode period="in-stay" />
                <LineInProccess v-if="currentPeriod == 'in-stay'"/>
                <LinePending v-else-if="currentPeriod == 'pre-stay'" />
                <LineComplete v-else/>
                <PeriodNode period="post-stay" />
                <LineComplete v-if="queryPostStay?.answered"/>
                <LineInProccess v-else-if="currentPeriod == 'post-stay' || currentPeriod == 'invalid-stay'"/>
                <LinePending v-else />
                <RequestNode />
            </div>
        </div>
    </section>
</template>
<script setup>
import { inject, onMounted } from 'vue'
import ReserveNode from './components/TimeLine/ReserveNode.vue'
import LineComplete from './components/TimeLine/LineComplete.vue'
import LineInProccess from './components/TimeLine/LineInProccess.vue'
import LinePending from './components/TimeLine/LinePending.vue'
import PeriodNode from './components/TimeLine/PeriodNode.vue'
import RequestNode from './components/TimeLine/RequestNode.vue'

const guestAccess = inject('guestAccess')
const currentPeriod = inject('currentPeriod')
const queryPostStay = inject('queryPostStay')


</script>
