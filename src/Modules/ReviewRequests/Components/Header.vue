<template>
    <section class="px-6">
        <div class="py-5 flex items-center gap-2">
            <h1 class="text-[22px] font-medium leading-[110%]">Seguimiento - Solicitudes</h1>
            <Tooltip
                size="l"
                :top="25"
                :left="0"
            >
                <template v-slot:button>
                    <img class="w-6 h-6" src="/assets/icons/info.blue.svg">
                </template>
                <template v-slot:content>
                    <p class="text-sm leading-[150%]">
                        Determinaremos qué huéspedes han tenido una experiencia satisfactoria, concluida la estancia y tras analizar los feedbacks recibidos. Una vez segmentados, se les enviará la solicitud de reseña a aquellos que puedan derivar en una reseña positiva.
                    </p>
                </template>
            </Tooltip>
        </div>
        <TabMenu :links="views"/>
    </section>
</template>
<script setup>
import { ref } from 'vue'
import Tooltip from '@/components/Tooltip.vue'
import TabMenu from '@/components/TabMenu.vue'

import { useRoute } from 'vue-router'
const route = useRoute();

const views = ref([
    {
        name: 'Stay',
        active : route.name == 'ReviewRequestSettingsIndex',
        viewName :'ReviewRequestSettingsIndex'
    },
    {
        name: 'Post-Stay',
        active : route.name == 'ReviewRequestSettingsPostStay',
        viewName :'ReviewRequestSettingsPostStay'
    },
])
</script>