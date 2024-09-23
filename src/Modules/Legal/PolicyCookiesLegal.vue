<template>
    <div class="h-screen px-6 bg-gray-50">
      <HeadLegal />
      <TabLegal />

      <div class="bg-white shadow-hoster rounded-[10px] py-6 px-4 w-[720px] 3xl:w-[1040px]">
        <div class="flex flex-col gap-2">
            <span class="text-[16px] font-semibold leading-[120%]">Política de cookies</span>
            <p class="text-sm leading-[140%]">El uso de cookies en la plataforma cumple con todas las regulaciones de privacidad y protección de datos. Garantizamos una óptima experiencia de usuario respetando la privacidad y cumpliendo con la normativa.</p>
        </div>
      </div>  
    </div>
</template>
<script setup>
import HeadLegal from './components/HeadLegal.vue';
import TabLegal from './components/TabLegal.vue';
// import SectionConfig from '@/components/SectionConfig.vue';
</script>