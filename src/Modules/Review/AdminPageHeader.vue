<template>
    <section class="bg-[#FAFAFA] z-[100]  w-full">
        <div class="flex justify-between py-[20px] mx-[24px] border-b border-[#BFBFBF]">
            <div class="space-x-2 flex justify-between w-full">
                <h1 class="font-medium text-[22px]">Visión general de las reseñas</h1>
                <div class="flex items-center">
                    <span class="text-sm font-medium mr-2">Próxima actualización a las 04:00</span>
                    <BaseTooltipResponsive
                        size="l"
                        :top="32"
                        :right="0"
                    >
                        <template #button>
                            <img class="w-[24px] h-[24px]" src="/assets/icons/TH.INFO.GREEN.svg">
                            </template>
                            <template #content>
                            <p class="text-sm leading-[150%] font-normal">
                                Cada día actualizamos las reseñas. Ten en cuenta que aquellas que respondas no se visualizarán en la plataforma hasta la siguiente actualización. Podrás gestionar todas tus reseñas de los últimos 30 días, de las distintas plataformas externas donde se encuentra tu alojamiento.
                            </p>
                        </template>
                    </BaseTooltipResponsive>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
//COMPONENTS
import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
</script>