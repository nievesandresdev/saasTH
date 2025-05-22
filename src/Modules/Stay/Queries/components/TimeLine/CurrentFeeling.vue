<template>
    <div class="w-[64px] h-[64px]">
        <img
            v-if="
                timeLineData && 
                (timeLineData.currentPeriod == 'in-stay' || timeLineData.currentPeriod == 'post-stay') &&
                timeLineData[timeLineData.currentPeriod].feeling
            "
            class="w-full h-full"
            :src="`/assets/icons/emojis/colors/1.TH.Emojis${ timeLineData[timeLineData.currentPeriod].feeling }.svg`"
        >
        <!-- (timeLineData.currentPeriod == 'in-stay' || timeLineData.currentPeriod == 'post-stay') && -->
        <img
            v-else-if="
                timeLineData && 
                !timeLineData[timeLineData.currentPeriod].feeling
            "
            class="w-full h-full" 
            src="/assets/icons/1.TH.EmojisNOEmotion.svg" alt=""
        >
    </div>
</template>
<script setup>
import { inject } from 'vue';


const timeLineData = inject('timeLineData');
</script>