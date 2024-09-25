<template>
    <div class="flex items-center space-x-[8px]">
        <BaseRatingIcons
            :rating="reviewData.travelerStart"
            :icon_full="'/assets/icons/1.TH.REVIEW.BLACK.svg'"
            :icon_empty="'/assets/icons/1.TH.REVIEW.BLACK.OUTLINE.svg'"
        />
        <span class="text-sm font-medium">{{ reviewData.travelerStart }} de 5</span>
    </div>
    <div class="flex items-center mt-2">
        <p class="text-sm">Idioma original:</p>
        <img 
            class="w-4 h-4 ml-2"
            :src="`/assets/icons/flags/${reviewData.languageOrigin}.svg`"
        >
        <p class="text-sm font-medium ml-1">{{ languagesObject[reviewData.languageOrigin] }}</p>
    </div>
    <p
        v-if="cribadoTranslateReview?.travelerText"
        class="text-sm mt-2"
        v-html="load(cribadoTranslateReview?.travelerText, router?.query?.search)"
    ></p>
</template>

<script setup>
import { inject, computed } from 'vue';
import BaseRatingIcons from '@/components/BaseRatingIcons';

//COMPOSABLES
import { useHighlightSearch } from '@/composables/useHighlightSearch';
const { searchQuery, load } = useHighlightSearch();

//INJECT
const router = inject('router');
const reviewData = inject('reviewData');
const languagesObject = inject('languagesObject');
const cribadoTranslateReview = inject('cribadoTranslateReview');

</script>