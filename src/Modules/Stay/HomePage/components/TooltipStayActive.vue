<template>
    <Tooltip
        size="l"
        :top="25"
        :right="0"
    >
        <template v-slot:button>
            <img class="w-4 h-4 ml-2" src="/assets/icons/info.blue.svg">
        </template>
        <template v-slot:content>
            <p class="text-base leading-[150%]">
                Selecciona una <span class="font-semibold">Estancia</span> del menu lateral para operar en ella. Podrás consultar 
                las fechas de <span class="font-semibold">Check-in</span> y <span class="font-semibold">Check-out</span>, la información y el <span class="font-semibold">feedback</span> de tus 
                huéspedes y <span class="font-semibold">chatear</span> con ellos.
            </p>
        </template>
    </Tooltip>
</template>
<script setup>
import Tooltip from '@/components/Tooltip.vue'
</script>
