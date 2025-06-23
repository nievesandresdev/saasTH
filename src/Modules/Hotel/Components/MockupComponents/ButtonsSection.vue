<template>
    <section 
        :class="{
            'mt-4 px-4': !inPanel,
        }"
        @mouseenter="hoverSection = true" 
        @mouseleave="hoverSection = false" 
        @click="currentSection = 'ButtonsSection'"
    >
        <div 
            class="flex items-center justify-between relative box-border border-4 border-transparent" 
            :class="{ 
                'p-3': !inPanel,
                'shadow-hoster2 cursor-pointer': hoverSection && !inPanel,
                'hborder-green-600': currentSection === 'ButtonsSection' && !inPanel,
                'rounded-[10px]': (currentSection === 'ButtonsSection' || hoverSection) && !inPanel,
            }"
        >
            <div v-for="button in buttons" :key="button.label">
                <span class="flex items-center p-2 gap-1 sp:gap-2 border border-white bg-gradient-h shadow-md rounded-full ml-auto mt-auto">
                    <img :src="button.icon" class="w-8 h-8" alt="Icon" />
                </span>
                <p class="text-[12px] font-bold lato leading-[16px] text-[#333333] text-center mt-2">{{ button.label }}</p>
            </div>

            <div 
                class="absolute top-2 right-2 bg-white rounded-[10px] p-1 shadow-hoster2"
                v-show="hoverSection && !inPanel"
            >
                <ToggleButton 
                    v-model="rawSections.buttonsSection.visibility" 
                    id="buttonsSection" textLeft="Visible"
                />
            </div>
        </div>
        <div class="mt-2 border-t border-[#e9e9e9]" v-if="!inPanel"></div>
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


const buttons = [
    {
        icon: '/assets/icons/WA.wifi.svg',
        label: 'WiFi',
    },
    {
        icon: '/assets/icons/WA.llamar.svg',
        label: 'Llamar',
    },
    {
        icon: '/assets/icons/WA.normas.svg',
        label: 'Normas',
    },
    {
        icon: '/assets/icons/WA.calendar.svg',
        label: 'Eventos',
    },
]
</script>
<style scoped>
.bg-gradient-h {
    background: linear-gradient(180deg, #F3F3F3 0%, #FAFAFA 100%);
}
</style>