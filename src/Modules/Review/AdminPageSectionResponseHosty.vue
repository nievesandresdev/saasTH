<template>
    <div class="rounded-[10px] border hborder-gray-400 bg-white px-4 py-6 w-full">
        <h5 class="text-base font-medium">Respuestas generadas por Hosty en los últimos 30 días</h5>
        <p class="text-sm mt-[8px]">Tangibiliza cuanto trabajo ha realizado por ti Hosty y todo el tiempo que has ahorrado</p>
        <div class="flex items-center mt-4">
            <img class="w-[42px] h-[42px]" src="/assets/img/hosty.png" alt="hosty">
            <div class="flex items-center space-x-[4px] ml-4">
                <span class="text-[24px] font-semibold">{{ summaryDataReview?.numbersResponseLastThirtyDays || 0 }}</span>
                <p class="text-sm font-medium">reseñas generadas por Hosty</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, inject } from 'vue';

// INJECT
const summaryDataReview = inject('summaryDataReview');

</script>