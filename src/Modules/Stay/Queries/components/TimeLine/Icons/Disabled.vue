<template>
    <div class="">
        <Tooltip
            size="s"
            :top="25"
            :left="0"
        >
            <template v-slot:button>
                <img class="w-6 h-6" src="/assets/icons/1.TH.! CIRCULODISABLED.svg" alt="">            
            </template>
            <template v-slot:content>
                <p class="text-xs font-medium">Feedback {{translatePeriod}}</p>
                <p class="text-xs mt-4">Feedback en {{translatePeriod}} está <span class="font-medium">desactivado.</span></p>
                <p @click="goSettings(goSettings)" class="text-xs mt-2 underline cursor-pointer">Actívalo ahora</p>
            </template>
        </Tooltip>
        <p class="absolute text-center text-xs leading-[90%] w-[130px] bottom-[-18px] left-[-45px]">Desactivado</p>
    </div>
</template>
<script setup>
import { inject, provide } from 'vue'
import Tooltip from '@/components/Tooltip.vue'

const period = inject('period')
const translatePeriod = inject('translatePeriod')

function goSettings(){
    let route_name = "hoster.queries.setting-prestay";
    if(period == 'in-stay'){
        route_name = "hoster.queries.setting-stay";
    }
    // Inertia.visit(route(route_name))
}
</script>