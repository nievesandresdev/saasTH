<template>
    <div class="rounded-[10px] border hborder-gray-400 bg-white px-4 py-6 w-full">
        <h5 class="text-base font-medium">Tiempo de respuesta en el mes anterior</h5>
        <p class="mt-[8px] text-sm">Aumenta tu posición en la OTA mejorando tu índice de respuesta.</p>
        <div class="mt-4 flex items-center">
            <img class="w-[48px] h-[48px]" src="/assets/icons/1.TH.CLOCK.BIG.svg">
            <div class="ml-[4px]">
                <p class="text-[14px] font-medium"><span class="text-[24px] font-semibold leading-[0%]">{{ timeRespondedLastThirtyDays ?? '-' }}</span> horas en responder en {{ nameMonthPrev }}</p>
                <p class="mt-[4px] text-[12px] font-medium" :class="!increasedResponseTime ? 'htext-green-600':'text-[#FF6666]'">Has {{ increasedResponseTime ? 'aumentado' : 'disminuido' }} un <span class="text-sm font-semibold" :class="!increasedResponseTime ? 'htext-green-600':'text-[#FF6666]'">{{ percentageTimeResponseTwoMonthPreviousComputed }}%</span> tu tiempo de respuesta</p>
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