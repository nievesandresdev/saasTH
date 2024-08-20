<template>
    <div class="flex items-center">
        <div class="text-xs font-medium bg-[#002E71] py-[6px] px-[1px] text-white rounded-[6px] w-[24px] h-[24px text-center">
            {{ reviewData.travelerStart }}
        </div>
        <h2 class="text-sm font-semibold ml-2" v-html="cribadoTranslateReview?.travelerTitle" />
    </div>
    <div
        v-if="cribadoTranslateReview.languageOrigin"
        class="flex items-center mt-2"
    >
        <p class="text-sm">Idioma original:</p>
        <img 
            class="w-4 h-4 ml-2"
            :src="`/assets/icons/flags/${cribadoTranslateReview.languageOrigin}.svg`"
        >
        <p class="text-sm font-medium ml-1">{{ languagesObject[cribadoTranslateReview.languageOrigin] }}</p>
    </div>
    <div v-if="cribadoTranslateReview?.travelerTextPositive || cribadoTranslateReview?.travelerTextNegative" class="mt-2">
        <p v-if="cribadoTranslateReview?.travelerTextPositive" class="text-sm">
            <img class="w-[13.3px] h-[13.3px] inline mr-2" src="/assets/icons/1.TH.EMOJI.HAPPY.svg" alt="">
            <span class="text-sm" v-html="cribadoTranslateReview?.travelerTextPositive"></span>
        </p>
        <p v-if="cribadoTranslateReview?.travelerTextNegative" class="text-sm mt-2" >
            <img class="w-[13.3px] h-[13.3px] inline mr-2" src="/assets/icons/1.TH.EMOJI.SAD.svg" alt="">
            <span class="text-sm" v-html="cribadoTranslateReview?.travelerTextNegative"></span>
        </p>
    </div>
</template>

<script setup>
import { inject, computed } from 'vue';
import BaseRatingIcons from '@/components/BaseRatingIcons';

//COMPOSABLES

//INJECT
const reviewData = inject('reviewData');
const languagesObject = inject('languagesObject');
const cribadoTranslateReview = inject('cribadoTranslateReview');

</script>