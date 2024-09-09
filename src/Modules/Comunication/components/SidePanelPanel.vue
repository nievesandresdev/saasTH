<template>
    <div class="bg-white shadow-hoster py-6">
        <h2 class="text-base font-semibold text-center">Previsualización del email</h2>
    </div>
    <div class="overflow-y-auto pt-6 px-2 h-[87vh] bg-white">
        <img 
            class="w-full h-[2352px] mb-8" 
            :src="`/assets/img/email-${conceptPanel}.png`"
        >
    </div>
</template>
<script setup>
import { inject } from 'vue'

const conceptPanel = inject('conceptPanel');

</script>