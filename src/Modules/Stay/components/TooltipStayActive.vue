<template>
    <Tooltip
        size="l"
        :top="25"
        :right="0"
        v-if="type=='post-stay'"
    >
        <template v-slot:button>
            <img class="w-4 h-4 ml-2" src="/assets/icons/info.blue.svg">
        </template>
        <template v-slot:content>
            <p class="text-sm leading-[150%] font-normal">
                Se consideran en
                    <span class="font-semibold">POST-STAY</span> todas las estancias de huéspedes que utilicen tu 
                    <span class="font-semibold">WebApp</span> luego de haber realizado su  
                    <span class="font-semibold">Check-out</span>
            </p>
        </template>
    </Tooltip>
    <Tooltip
        size="l"
        :top="25"
        :left="0"
        v-else
    >
        <template v-slot:button>
            <img class="w-4 h-4 ml-2" src="/assets/icons/info.blue.svg">
        </template>
        <template v-slot:content>
            <p class="text-sm leading-[150%] font-normal">
                <template v-if="type == 'title'">
                    Aquí verás las estancias de aquellos huéspedes que hayan accedido a tu <span class="font-semibold">WebApp</span> y cargado sus datos.
                </template>
                <template v-if="type == 'pre-stay'">
                    Se consideran en <span class="font-semibold">PRE-STAY</span>
                    todas las estancias de huéspedes que utilicen tu 
                    <span class="font-semibold">WebApp</span> y aún no hayan llegado a su fecha de 
                    <span class="font-semibold">Check-In</span>
                </template>
                <template v-if="type == 'in-stay'">
                    Se consideran en 
                    <span class="font-semibold">STAY</span> todas las estancias de huéspedes que utilicen tu 
                    <span class="font-semibold">WebApp</span> luego de su fecha de 
                    <span class="font-semibold">Check-In</span> y antes de su 
                    <span class="font-semibold">Check-out</span>
                </template>
            </p>
        </template>
    </Tooltip>
</template>
<script setup>
import Tooltip from '@/components/Tooltip.vue'
defineProps({
    type:{
        type: String,
        default: ''
    }
})
</script>
