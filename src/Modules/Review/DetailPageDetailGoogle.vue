<template>
    <div class="flex items-center space-x-[8px]">
        <BaseRatingIcons :rating="reviewData.travelerStart"/>
        <span class="text-sm font-medium">{{reviewData.travelerStart}} de 5</span>
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
    <p
        v-if="cribadoTranslateReview?.travelerText"
        class="text-sm mt-2"
        v-html="load(cribadoTranslateReview?.travelerText, router?.query?.search)"
    ></p>
    <div
        v-if="notEmptySubRating"
        class="flex mt-2 space-x-2"
    >
            <p class="text-sm font-medium">
                Habitaciones <span class="font-normal ml-2">{{ reviewData.subratings?.Rooms?.toFixed(1) }}</span>
            </p>
            <p class="text-sm font-medium">
                Servicio <span class="font-normal ml-2">{{ reviewData.subratings?.Service?.toFixed(1) }}</span>
            </p>
            <p class="text-sm font-medium">
                Ubicación <span class="font-normal ml-2">{{ reviewData.subratings?.Location?.toFixed(1) }}</span>
            </p>
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

const notEmptySubRating = computed(() => {
    const subratings = reviewData.value?.subratings;
    return !!subratings && (subratings?.Rooms || subratings?.Service || subratings?.Location);
});

</script>