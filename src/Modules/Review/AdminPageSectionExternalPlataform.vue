<template>
    <div class="rounded-[10px] border hborder-gray-400 bg-white px-4 py-6 space-y-4 w-full space-y-4">
        <h5 class="text-[14px] font-semibold">Reseñas por plataformas externas en los últimos 30 días</h5>
        <div
            v-for="(ota, index) in reviewStore.otas"
            :key="index"
            class="flex items-center justify-between"
        >
            <div
                class="w-[118px] space-x-[4px] flex items-center"
                :class="{'opacity-35': !!reviewStore.otasWithUrls?.length && !reviewStore.otasWithUrls?.includes(ota)}"
            >
                <img class="w-[24px] h-[24px]" :src="`/assets/icons/otas/${$titleCase(ota)}.svg`">
                <span class="text-sm font-medium">{{ ota == 'TRIPADVISOR' ? 'TripAdvisor' : $titleCase(ota) }}
                    <template v-if="ota === 'AIRBNB'">
                        ({{ calcSummaryByOta(ota)?.numbersUrls }} anuncios)
                    </template>
                </span>
            </div>

            <div
                :class="{'opacity-35': !!reviewStore.otasWithUrls?.length && !reviewStore.otasWithUrls?.includes(ota), 'pr-[6px]': calcSummaryByOta(ota)?.scaleRating == 5}"
                class="w-[42px] text-right"

            >
                <span
                    class="text-[14px] font-semibold"
                >
                    {{ !!calcSummaryByOta(ota)?.note && !!calcSummaryByOta(ota)?.totalReviews ? calcSummaryByOta(ota)?.note : '--' }}
                </span>
                <span class="text-[10px] font-medium">/</span>
                <span class="text-[10px] font-medium">{{ calcSummaryByOta(ota)?.scaleRating }}</span>
            </div>
            
            <div class="w-[82px]">
                <template v-if="!!reviewStore.otasWithUrls?.length && !reviewStore.otasWithUrls?.includes(ota)">
                    <button
                        class="hbtn-tertiary underline text-sm font-medium"
                        @click="$router.push({name: 'ExternalPlatforms'})"
                    >
                        Añadir OTA
                    </button>
                </template>
                <template v-else>
                    <p class="text-sm font-semibold  text-right">{{ calcSummaryByOta(ota)?.totalReviews }} <span class="text-xs font-medium inline-block w-[46px]">{{calcSummaryByOta(ota)?.totalReviews == 1 ? 'reseña' : 'reseñas'}}</span></p>                
                </template>
            </div>
        </div>
    </div>

</template>

<script setup>
import { inject, computed } from 'vue';
import { $titleCase } from '@/utils/textWritingTypes';

// INJECT
const summaryByOta = inject('summaryByOta');
const reviewStore = inject('reviewStore');

const summaryByOtaUnique = computed(() => {
    let summaryByOtaValue = summaryByOta.value;
    summaryByOtaValue = summaryByOtaValue.map(item => {
        if (item?.reviews){
            delete item.reviews;
        }
        return item;
    });
    const result = summaryByOtaValue.reduce((acc, current) => {
        // Buscar si ya existe la OTA en el acumulador
        const existing = acc.find(item => item.ota === current.ota);

        if (existing) {
            existing['numbersUrls'] += 1;
            if (!current.summary.totalReviews) return acc;

            // Validar si existingSumAndAvgRatings o currentSumAndAvgRatings son 0
            const existingSumAndAvgRatings =
                existing.summary.totalReviews > 0
                    ? existing.summary.sumAndAvgRatings * existing.summary.totalReviews
                    : 0;
            const currentSumAndAvgRatings =
                current.summary.totalReviews > 0
                    ? parseFloat(current.summary.sumAndAvgRatings) * current.summary.totalReviews
                    : 0;

            // Si ambos son 0, no hacer nada
            if (existingSumAndAvgRatings === 0 && currentSumAndAvgRatings === 0) {
                return acc;
            }

            // Sumar totalReviews excluyendo los casos con promedio 0
            const validTotalReviews =
                (existingSumAndAvgRatings > 0 ? existing.summary.totalReviews : 0) +
                (currentSumAndAvgRatings > 0 ? current.summary.totalReviews : 0);

            if (validTotalReviews === 0) {
                return acc; // Si no hay reviews válidos, no procesar
            }

            // Calcular el promedio ponderado con los valores válidos
            existing.summary.sumAndAvgRatings = (
                (existingSumAndAvgRatings + currentSumAndAvgRatings) / validTotalReviews
            ).toFixed(2);

            // Actualizar el total de reviews
            existing.summary.totalReviews = validTotalReviews;
        } else {
            // Si no existe, agregar al acumulador
            acc.push({ ota: current.ota, numbersUrls: 1, summary: { ...current.summary } });
        }

        return acc;
    }, []);

    return result;
});

function calcSummaryByOta (ota){
    let summary = summaryByOtaUnique.value?.find(item => item.ota == ota);
    let noteNumeric = summary?.summary?.sumAndAvgRatings ? Number(summary?.summary?.sumAndAvgRatings) : 0;
    let note = noteNumeric > 0 ? noteNumeric?.toFixed(1) : 0;
    let scaleRating = reviewStore?.scaleRating[ota];
    let totalReviews = summary?.summary?.totalReviews || 0;
    let numbersUrls = summary?.numbersUrls || 0;
    return {
        note,
        scaleRating,
        totalReviews,
        numbersUrls
    }
}



</script>

