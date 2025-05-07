<template>
    <h1 class="text-[22px] font-medium leading-[110%] py-5 flex gap-2">
        Integraciones
        <Tooltip size="l" :top="25" :left="5">
            <template v-slot:button>
                <img class="w-6 h-6" src="/assets/icons/info.blue.svg">
            </template>
            <template v-slot:content>
                <p class="text-sm text-[#333333]">Aquí puedes revisar las URLs de tus plataformas externas y, si es necesario, añadir las credenciales para que podamos incluir el enlace a tu WebApp en los mensajes automáticos que lanzan las distintas plataformas cuando se genera una reserva</p>
            </template>
        </Tooltip>
    </h1>
    
</template>
<script setup>
import Tooltip from '@/components/Tooltip.vue';
</script>

