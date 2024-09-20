<template>
    <button class="p-4 rounded-md bg-green-400" @click="submitInitWB">Sincronizar info WB</button>
</template>

<script setup>

import { ref } from 'vue';

import getDataWB from '@/api/services/test/whatsappServices';

const submitInitWB = async () => {
   const response = await getDataWB();

   console.log(response);
};

</script>