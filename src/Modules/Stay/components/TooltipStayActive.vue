<template>
    <Tooltip
        size="l"
        :top="16"
        :right="0"
        v-if="type=='post-stay'"
    >
        <template v-slot:button>
            <img class="w-4 h-4 ml-2" src="/assets/icons/info.blue.svg">
        </template>
        <template v-slot:content>
            <p class="text-sm leading-[150%] font-normal">Las estancias que utilicen tu WebApp después de la hora máxima de check-out se clasificarán como Post-Stay.</p>
            <span 
                class="text-sm leading-[150%] block mt-2 underline cursor-pointer font-normal"
                @click="goProfile"
            >Alojamiento > Perfil > Horario Check-in / Check-out</span>
        </template>
    </Tooltip>
    <Tooltip
        size="l"
        :top="16"
        :left="0"
        v-else
    >
        <template v-slot:button>
            <img class="w-4 h-4 ml-2" src="/assets/icons/info.blue.svg">
        </template>
        <template v-slot:content>
            <p class="text-sm leading-[150%] font-normal" v-if="type == 'title'">
                Aquí verás las estancias de aquellos huéspedes que hayan accedido a tu <span class="font-semibold">WebApp</span> y cargado sus datos.
            </p>
            <template v-else-if="type == 'pre-stay' || type == 'in-stay'">
                <p v-if="type == 'pre-stay'" class="text-sm leading-[150%] font-normal">Las estancias que utilicen tu WebApp antes del check-in se clasificarán como Pre-Stay. Alcanzada la hora mínima de llegada el día del check-in, la estancia se actualizará a la categoría Stay.</p>
                <p v-else class="text-sm leading-[150%] font-normal">Las estancias que utilicen tu WebApp entre el check-in y el check-out se clasificarán como Stay. Una vez pasada la hora máxima de salida el día del check-out, la estancia se actualizará a Post-Stay.</p>
                <span 
                    class="text-sm leading-[150%] block mt-2 underline cursor-pointer font-normal"
                    @click="goProfile"
                >Alojamiento > Perfil > Horario Check-in / Check-out</span>
            </template>
        </template>
    </Tooltip>
</template>
<script setup>
import Tooltip from '@/components/Tooltip.vue'
import { useRouter } from 'vue-router';
const router = useRouter();

defineProps({
    type:{
        type: String,
        default: ''
    }
})

const goProfile = async () => {
    router.push('/alojamiento/perfil#checkin-checkout')
}
</script>
