<template>
    <div class="rounded-[10px] border hborder-gray-400 bg-white px-4 py-6 w-full">
        <h5 class="text-base font-medium">Reseñas gestionadas con Hosty en los últimos 30 días</h5>
        <p class="text-sm mt-[8px]">Descubre cuánto trabajo has ahorrado con la ayuda de Hosty.</p>
        <div class="flex items-center mt-4">
            <img class="size-[32px] ml-1.5" src="/assets/img/1.TH.REVIEW.ANSWERED.png" alt="REVIEW.ANSWERED">
            <div class="flex items-center space-x-[4px] ml-2">
                <span class="text-[22px] font-medium">{{ summaryDataReview?.numbersReviewsResponseLastThirtyDays || 0 }}</span>
                <p class="text-sm font-medium">reseñas gestionadas con Hosty</p>
            </div>
        </div>
        <div class="flex items-center mt-2">
            <img class="size-[42px]" src="/assets/img/hosty.png" alt="hosty">
            <div class="flex items-center space-x-[4px] ml-2">
                <span class="text-[22px] font-medium">{{ summaryDataReview?.numbersResponseLastThirtyDays || 0 }}</span>
                <p class="text-sm font-medium">respuestas sugeridas por Hosty</p>
            </div>
        </div>
    </div>
    <!-- numbersResponseLastThirtyDays -->
<!-- numbersReviewsResponseLastThirtyDays -->
</template>
<script setup>
import { computed, inject } from 'vue';

// INJECT
const summaryDataReview = inject('summaryDataReview');

</script>