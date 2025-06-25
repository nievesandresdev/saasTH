<template>
<div class="pb-6">
    <section class="px-6 mb-6">
        <div class="space-x-2 flex items-center border-b border-[#BFBFBF] py-5">
          <h1 class="text-[22px] font-medium leading-[110%]">Home</h1>
          <BaseTooltipResponsive size="l" :top="35" :left="-0">
            <template #button>
              <img class="w-[20px] h-[20px]" src="/assets/icons/TH.INFO.GREEN.svg" />
            </template>
            <template #content>
              <p class="text-sm leading-[150%] font-normal">
                Configura la visibilidad, el orden y el estilo de los módulos de la Home de tu WebApp.
              </p>
              <br>
              <p class="text-sm leading-[150%] font-normal">
                Arrastra y suelta para ordenarlos.
              </p>
            </template>
          </BaseTooltipResponsive>
        </div>
    </section>
    
    <MockupHotelHome />
</div>
</template>

<script setup>
import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
import MockupHotelHome from './Components/MockupHotelHome.vue';
</script>

<style scoped>
</style>