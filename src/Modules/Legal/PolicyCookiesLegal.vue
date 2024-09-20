<template>
    <div class="h-screen px-6 bg-gray-50">
      <HeadLegal />
      <TabLegal />

      <SectionConfig :widht="'67%'">
        <template v-slot:title>
            <div class="flex flex-col gap-2">
                <span class="text-[16px] font-semibold text-gray-800">Política de cookies</span>
                <p class="font-normal text-sm">El uso de cookies en la plataforma cumple con todas las regulaciones de privacidad y protección de datos. Garantizamos una óptima experiencia de usuario respetando la privacidad y cumpliendo con la normativa.</p>
            </div>
        </template>
      </SectionConfig>
    </div>
</template>
<script setup>
import HeadLegal from './components/HeadLegal.vue';
import TabLegal from './components/TabLegal.vue';
import SectionConfig from '@/components/SectionConfig.vue';
</script>