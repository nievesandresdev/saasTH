<template>
    <div class="h-screen px-6 bg-gray-50">
      <HeadLegal />
      <TabLegal />
  
      <div class="bg-white shadow-hoster rounded-[10px] py-6 px-4 w-[720px] 3xl:w-[1040px]">  
        <p class="text-[16px] leading-[120%] font-semibold">Política de privacidad</p>
        <p class="font-normal text-sm mt-2 leading-[140%]">
          La política de privacidad explica de manera clara y sencilla cómo recopilamos y tratamos los datos personales de los huéspedes, cumpliendo con la legislación vigente. Además, informamos detalladamente sobre sus derechos en materia de protección de datos.
        </p>
        <div class="flex justify-end mt-2 w-full">
          <div @click="generatePDF" class="flex cursor-pointer items-center gap-2">
            <img src="/assets/icons/1.TH.DOWNLOAD.svg" alt="info" class="w-3 h-3">
            <span class="text-xs font-medium leading-[90%]">Descargar</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import HeadLegal from './components/HeadLegal.vue';
  import TabLegal from './components/TabLegal.vue';
  // import SectionConfig from '@/components/SectionConfig.vue';
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
  