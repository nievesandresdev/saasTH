<template>
    <div class="h-screen px-6 bg-gray-50">
      <HeadLegal />
      <TabLegal />

      <SectionConfig>
        <template v-slot:title>
          <h2 class="text-lg font-semibold text-gray-800">Política de privacidad</h2>
        </template>
        
      </SectionConfig>
    </div>
      
  </template>
  
<script setup>
import HeadLegal from './components/HeadLegal.vue';
import TabLegal from './components/TabLegal.vue';
import SectionConfig from '@/components/SectionConfig.vue'



</script>
  