<template>
    <div class="h-screen px-6 bg-gray-50">
      <HeadLegal />
      <TabLegal />
  
      <SectionConfig :widht="'67%'">
        <template v-slot:title>
          <div class="flex flex-col gap-2">
            <span class="text-[16px] font-semibold text-gray-800">Política de privacidad</span>
            <p class="font-normal text-sm">
              La política de privacidad explica de manera clara y sencilla cómo recopilamos y tratamos los datos personales de los huéspedes, cumpliendo con la legislación vigente. Además, informamos detalladamente sobre sus derechos en materia de protección de datos.
            </p>
            <div class="flex justify-end">
              <div @click="generatePDF" class="flex cursor-pointer">
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
  import { ref, onMounted } from 'vue';
  import HeadLegal from './components/HeadLegal.vue';
  import TabLegal from './components/TabLegal.vue';
  import SectionConfig from '@/components/SectionConfig.vue';
  import { generatePolicyPDF } from '@/pdf/legal/policy';
    import { generateDelegatePDF } from '@/pdf/legal/policyDelegate';
  import { getGeneralLegal } from '@/api/services/legal/legal.services';
  
  const policy_protection = ref(false);
  
  const pdfData = ref({
    hotel: 'Hotel Example',
    direccion: '123 Example Street, City, Country',
    nif: 'A12345678',
    email: 'contact@example.com',
    emailDelegate: '',
    addressDelegate: '',
  });
  
  onMounted(() => {
    getData();
  });
  
  const getData = async () => {
    try {
      const response = await getGeneralLegal();
      policy_protection.value = response.data.legal.protection;

        pdfData.value = {
            hotel: response.data.hotel.name,
            direccion: response.data.hotel.address,
            nif: response.data.legal.nif,
            email: response.data.legal.email,
            emailDelegate: response.data.legal?.email_protection,
            addressDelegate: response.data.legal?.address,
        };
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const generatePDF = () => {
    if(!policy_protection.value) {
        generatePolicyPDF(pdfData.value);
    }else{
        generateDelegatePDF(pdfData.value);
    }
    
  };
  </script>
  