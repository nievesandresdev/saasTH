<template>
    <section 
        class="relative box-border border-4 border-transparent" 
        @mouseenter="hoverSection = true" 
        @mouseleave="hoverSection = false" 
        @click="currentSection = 'facilitiesSection'"
        :class="{
            'pl-1 pt-1 mr-1': !inPanel,
            'shadow-hoster2 cursor-pointer': hoverSection && !inPanel,
            'hborder-green-600': currentSection === 'facilitiesSection' && !inPanel,
            'rounded-[10px]': (currentSection === 'facilitiesSection' || hoverSection) && !inPanel,
        }"
    >
        <div class="flex items-center">
            <img src="/assets/icons/WA.Instalaciones.svg" class="w-[24px] h-[24px] mr-2">
            <h2 class="lato text-[20px] font-bold leading-[28px]">
                Instalaciones
            </h2>
            <span 
                class="lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px] underline hover:underline ml-auto"
            >
                Ver todo
            </span>
        </div>
        <div class="flex mt-2 overflow-hidden ml-[-8px]">
            <img src="/assets/img/WA.card-instalacion1.png" class="w-[248px] flex-shrink-0">
            <img src="/assets/img/WA.card-instalacion2.png" class="w-[248px] flex-shrink-0">
        </div>

        <div 
            class="absolute top-4 right-4 bg-white rounded-[10px] p-1 shadow-hoster2"
            v-show="hoverSection && !inPanel"
        >
            <ToggleButton 
                v-model="rawSections.facilitiesSection.visibility" 
                id="facilitiesSection" textLeft="Visible"
            />
        </div>
    </section>
</template>
<script setup>
import { ref, inject } from 'vue'
import ToggleButton from '@/components/Buttons/ToggleButton.vue'

const props = defineProps({
    inPanel: {
        type: Boolean,
        default: false,
    },
})

const hoverSection = ref(false)
const rawSections = inject('rawSections')
const currentSection = inject('currentSection')
</script>