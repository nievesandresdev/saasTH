<template>
    <p class="text-sm font-medium">{{ reviewData?.travelerStart }}/10 {{ textRating }}</p>
    <div
        v-if="reviewData.languageOrigin"
        class="flex items-center mt-2"
    >
        <p class="text-sm">Idioma original:</p>
        <img 
            class="w-4 h-4 ml-2"
            :src="`/assets/icons/flags/${reviewData.languageOrigin}.svg`"
        >
        <p class="text-sm font-medium ml-1">{{ languagesObject[reviewData.languageOrigin] }}</p>
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
    <p v-if="cribadoTranslateReview?.travelerText" class="text-sm mt-2" v-html="cribadoTranslateReview?.travelerText" />
</template>

<script setup>
import { inject, computed } from 'vue';
import BaseRatingIcons from '@/components/BaseRatingIcons';

//COMPOSABLES

//INJECT
const reviewData = inject('reviewData');
const languagesObject = inject('languagesObject');
const cribadoTranslateReview = inject('cribadoTranslateReview');

const notEmptySubRating = computed(() => {
    const subratings = reviewData.value?.subratings;
    return !!subratings && (subratings?.Rooms || subratings?.Service || subratings?.Location);
});

const textRating = computed(() => {
    const STAR_DESCRIPTION = {
        '10' : {name: 'Exelente'},
        '8' : {name: 'Bueno'},
        '6' : {name: 'Normal'},
        '4' : {name: 'Mediocre'},
        '2' : {name: 'Horrible'},
    }
    let travelerStartDescription = STAR_DESCRIPTION?.[reviewData.value?.travelerStart]?.name;
    return travelerStartDescription;
});

</script>