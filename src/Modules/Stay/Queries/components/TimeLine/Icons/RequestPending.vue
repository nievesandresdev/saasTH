<template>
    <div class="">
        <Tooltip
            size="s"
            :top="25"
            :right="0"
        >
            <template v-slot:button>
                <img class="w-4 h-4" src="/assets/icons/Time-line-icons-check-PENDING.svg" alt="">            
            </template>
            <template v-slot:content>
                <p class="text-xs font-medium">Solicitud de reseña</p>
                <p class="text-xs mt-4">Todavía no se ha realizado el seguimiento completo para determinar si solicitar la reseña o no.</p>
            </template>
        </Tooltip>
        <p class="absolute text-center text-xs leading-[90%] w-[130px] bottom-[-18px] left-[-45px]">Pendiente</p>
    </div>
</template>
<script setup>
import Tooltip from '@/components/Tooltip.vue'
</script>