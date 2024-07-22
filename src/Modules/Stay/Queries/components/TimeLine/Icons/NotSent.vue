<template>
    <div class="">
        <Tooltip
            size="s"
            :top="25"
            :left="0"
        >
            <template v-slot:button>
                <img class="w-6 h-6" src="/assets/icons/1.TH.Not send.svg" alt="">            
            </template>
            <template v-slot:content>
                <p class="text-xs font-medium">Feedback {{translatePeriod}}</p>
                <p class="text-xs mt-4">
                    No se ha realizado el feedback en {{translatePeriod}} porque el huésped ha ingresado en la WebApp 
                    <span class="font-medium">después del día del {{checkWord[period]}}.</span>
                </p>
            </template>
        </Tooltip>
        <p class="absolute text-center text-xs leading-[90%] w-[130px] bottom-[-18px] left-[-45px]">No enviado</p>
    </div>
</template>
<script setup>
import { inject, provide } from 'vue'
import Tooltip from '@/components/Tooltip.vue'

const period = inject('period')
const translatePeriod = inject('translatePeriod')

let checkWord ={
    "pre-stay":"Check-in",
    "in-stay":"Check-out",
}
</script>