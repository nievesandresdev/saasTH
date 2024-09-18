<template>
    <div class="flex">
        <BaseRatingIcons 
            :rating="reviewData.travelerStart"
            :icon_full="'/assets/icons/1.TH.REVIEW.POINT.svg'"
            :icon_empty="'/assets/icons/1.TH.REVIEW.POINT.OUTLINE.svg'"
        />
        <span class="text-sm font-medium leading-0 ml-1">
            {{ reviewData.travelerStart }} de 5
        </span>
    </div>
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
    <p v-if="cribadoTranslateReview?.travelerTitle" class="text-sm font-medium mt-2" v-html="cribadoTranslateReview?.travelerTitle" />
    <p
        v-if="cribadoTranslateReview?.travelerText"
        class="text-sm mt-2"
        v-html="load(cribadoTranslateReview?.travelerText, router?.query?.search)"
    ></p>
    <div v-if="reviewData?.subratings?.length" class="mt-2 space-y-2">
        <div class="flex">
            <BaseRatingIcons 
                :rating="reviewData?.subratings[0].value"
                :icon_full="'/assets/icons/1.TH.REVIEW.POINT.svg'"
                :icon_empty="'/assets/icons/1.TH.REVIEW.POINT.OUTLINE.svg'"
            />
            <span class="ml-1 text-sm font-medium">Relación calidad precio</span>
        </div>
        <div class="flex">
            <BaseRatingIcons 
                :rating="reviewData?.subratings[1].value"
                :icon_full="'/assets/icons/1.TH.REVIEW.POINT.svg'"
                :icon_empty="'/assets/icons/1.TH.REVIEW.POINT.OUTLINE.svg'"
            />
            <span class="ml-1 text-sm font-medium">Ubicación</span>
        </div>
        <div class="flex">
            <BaseRatingIcons 
                :rating="reviewData?.subratings[2].value"
                :icon_full="'/assets/icons/1.TH.REVIEW.POINT.svg'"
                :icon_empty="'/assets/icons/1.TH.REVIEW.POINT.OUTLINE.svg'"
            />
            <span class="ml-1 text-sm font-medium">Servicio</span>
        </div>
    </div>
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