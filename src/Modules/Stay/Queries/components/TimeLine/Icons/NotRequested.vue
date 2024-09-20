<template>
    <div class="">
        <Tooltip
            size="s"
            :top="25"
            :right="0"
        >
            <template v-slot:button>
                <img class="w-6 h-6" src="/assets/icons/1.TH.Not send.svg" alt="">            
            </template>
            <template v-slot:content>
                <p class="text-xs font-medium">Solicitud de reseña</p>
                <p class="text-xs mt-4">
                    Tras el seguimiento realizado, no es recomendable solicitar una reseña a este huésped.
                </p>
            </template>
        </Tooltip>
        <p class="absolute text-center text-xs leading-[90%] w-[130px] bottom-[-18px] left-[-45px]">No solicitado</p>
    </div>
</template>
<script setup>
import Tooltip from '@/components/Tooltip.vue'
</script>