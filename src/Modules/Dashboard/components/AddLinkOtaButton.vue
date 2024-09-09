<template>
    <span 
        class="cursor-pointer text-xs font-semibold leading-[130%] underline ml-auto"
        @click="goView"
    >
        Añadir OTA
    </span>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();

const goView = () =>{
    router.push('/equipo/configuracion/plataformas-externas')
}
</script>