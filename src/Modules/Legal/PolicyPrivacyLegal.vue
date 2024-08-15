<template>
    <div class="h-screen px-6 bg-gray-50">
      <HeadLegal />
      <TabLegal />

      <SectionConfig>
        <template v-slot:title>
            <div class="flex flex-col gap-2">
                <span class="text-[16px] font-semibold text-gray-800">Política de privacidad</span>
                <p class="font-normal text-sm">La política de privacidad explica de manera clara y sencilla cómo recopilamos y tratamos los datos personales de los huéspedes, cumpliendo con la legislación vigente. Además, informamos detalladamente sobre sus derechos en materia de protección de datos.</p>
                <div class="flex justify-end">
                    <div class="flex cursor-pointer">
                        <img src="/assets/icons/1.TH.DOWNLOAD.svg" alt="info" class="w-3 h-3">
                        <span class="text-xs font-medium text-black ml-1">Descargar</span>
                    </div>
                    
                </div>
            </div>
          

        </template>
        
      </SectionConfig>
    </div>
      
  </template>
  
<script setup>
import HeadLegal from './components/HeadLegal.vue';
import TabLegal from './components/TabLegal.vue';
import SectionConfig from '@/components/SectionConfig.vue'
import { getGeneralLegal } from '@/api/services/legal/legal.services';
import { ref, onMounted } from 'vue';

onMounted(() => {
    getData();
});


const policy_porotection = ref(false);
const getData = async() => {
    const response = await getGeneralLegal();

    policy_porotection.value = response.data.legal.protection;

};



</script>
  