<template>
    <!-- @click="currentSection = 'placesExploreSection'" -->
    <section
        class="relative border-4 border-transparent" 
        @mouseenter="hoverSection = true" 
        @mouseleave="hoverSection = false" 
        :class="{
            'p-1': !inPanel,
            'shadow-hoster2 cursor-pointer': hoverSection && !inPanel,
            'hborder-green-600': currentSection === 'placesExploreSection' && !inPanel,
            'rounded-[10px]': (currentSection === 'placesExploreSection' || hoverSection) && !inPanel,
            'cursor-grab': grabbingSection === 'placesExploreSection',
        }"
    >
        <div class="flex items-center">
            <img src="/assets/icons/WA.star.svg" class="w-[24px] h-[24px] mr-2">
            <h2 class="lato text-[20px] font-bold leading-[28px]">
                Explora tu destino
            </h2>
        </div>
        <div class="mt-4 pb-4" >
            <img src="/assets/img/mapaMockupExplora.png" class="w-full h-[133px]">
            <p class="lato text-[14px] font-bold leading-[16px] mt-4">
                Más de 300 sitios de interés
            </p>
            <div class="flex gap-2 mt-4 overflow-hidden">
                <span class="border hborder-disabled-input rounded-[2px] p-1 flex items-center gap-1 flex-shrink-0">
                    <img src="/assets/icons/WA.monumentos.BlACK.svg" alt="" class="w-[16px] h-[16px]">
                    <p class="lato text-sm leading-[16px]">25 Monumentos</p>
                </span>
                <span class="border hborder-disabled-input rounded-[2px] p-1 flex items-center gap-1 flex-shrink-0">
                    <img src="/assets/icons/WA.restaurantes.svg" alt="" class="w-[16px] h-[16px]">
                    <p class="lato text-sm leading-[16px]">53 Restaurantes</p>
                </span>
                <span class="border hborder-disabled-input rounded-[2px] p-1 flex items-center gap-1 flex-shrink-0">
                    <img src="/assets/icons/WA.Museos.svg" alt="" class="w-[16px] h-[16px]">
                    <p class="lato text-sm leading-[16px]">18Museos</p>
                </span>
            </div>
        </div>

        <div 
            class="absolute top-2 right-2 bg-white rounded-[10px] p-1 shadow-hoster2 z-[100]"
            v-show="hoverSection && !inPanel"
            @mouseup.stop
        >
            <ToggleButton 
                v-model="rawSections.placesExploreSection.visibility" 
                id="placesExploreSection" textLeft="Visible"
                @change="updateOrderSections('placesExploreSection')"
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
const emit = defineEmits(['updateOrderSections'])

function updateOrderSections(section) {
    emit('updateOrderSections', section)
}
</script>