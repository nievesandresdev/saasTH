<template>
    <div class="rounded-[10px] border hborder-gray-400 bg-white px-4 py-6 w-full">
        <h5 class="text-[14px] font-semibold">Tiempo medio en atender reseñas en el mes pasado</h5>
        <p class="mt-[8px] text-sm">Optimiza el tiempo de respuesta tras la publicación de una reseña.</p>
        <div class="mt-4 flex items-stretch space-x-2">
            <div class="flex items-start h-full">
                <div class="w-[32px]">
                    <img class="size-[32px]" src="/assets/icons/1.TH.CLOCK.BIG.svg">
                </div>
            </div>
            <div class="ml-[4px]">
                <p class="text-[14px] font-medium"><span class="text-[22px]">{{ `${timeRespondedLastThirtyDays}` ?? '-' }}</span>{{ timeRespondedLastThirtyDays ? 'h' : '' }} de media en contestar a una reseña una vez publicada</p>
                <p class="mt-[4px] text-[12px] font-medium" :class="!increasedResponseTime ? 'htext-green-600':'text-[#FF6666]'">Has {{ increasedResponseTime ? 'aumentado' : 'disminuido' }} un <span class="text-sm font-semibold" :class="!increasedResponseTime ? 'htext-green-600':'text-[#FF6666]'">{{ percentageTimeResponseTwoMonthPreviousComputed }}%</span> tu tiempo de respuesta en {{ nameMonthPrev }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, computed } from 'vue';
import { DateTime } from 'luxon';

const timeRespondedLastThirtyDays = inject('timeRespondedLastThirtyDays');
const percentageTimeResponseTwoMonthPrevious = inject('percentageTimeResponseTwoMonthPrevious');

const nameMonthPrev = computed(() => {
    // Obtener la fecha actual
    const now = DateTime.now();

    // Calcular el mes anterior
    const monthPrev = now.minus({ months: 1 });

    // Obtener el nombre del mes anterior
    const nameMonthPrev = monthPrev.setLocale('es').toFormat('LLLL');
    return nameMonthPrev;
});
const increasedResponseTime = computed(() => {
    return percentageTimeResponseTwoMonthPrevious.value > 0;
});
const percentageTimeResponseTwoMonthPreviousComputed = computed(() => {
    let percentage = percentageTimeResponseTwoMonthPrevious.value;
    if ( percentage < 0) {
        percentage = -(Number(percentage));
        return percentage?.toFixed(0);
    }
    return percentage?.toFixed(0);
});

</script>