<template>
    <section
        class="relative border-4 border-transparent" 
        @mouseenter="hoverSection = true" 
        @mouseleave="hoverSection = false" 
        @click="currentSection = 'placesRecommendationSection'"
        :class="{
            'p-1': !inPanel,
            'shadow-hoster2 cursor-pointer': hoverSection && !inPanel,
            'hborder-green-600': currentSection === 'placesRecommendationSection' && !inPanel,
            'rounded-[10px]': (currentSection === 'placesRecommendationSection' || hoverSection) && !inPanel,
        }"
    >
    <template v-if="rawSections.placesRecommendationSection.style == 1">
        <div class="flex items-center">
            <img src="/assets/icons/WA.star.svg" class="w-[24px] h-[24px] mr-2">
            <h2 class="lato text-[20px] font-bold leading-[28px]">
                Destino - Recomendados
            </h2>
        </div>
        <div class="mt-4 rounded-[10px] overflow-hidden shadow-hoster">
            <div class="w-full p-2 bg-[#FFD700]">
                <span class="lato text-[16px] font-bold leading-[20px]">Sitios exclusivos para ti</span>
            </div>
            <div class="relative">
                <div class="absolute top-0 left-0 w-full h-full flex gap-2 px-2 pt-2">
                    <div class="bg-white h-1.5 flex-grow rounded-full"></div>
                    <div class="bg-white h-1.5 flex-grow rounded-full opacity-25"></div>
                    <div class="bg-white h-1.5 flex-grow rounded-full opacity-25"></div>
                </div>
                <img src="/assets/img/PlacesRecoSection.jpg" alt="" class="w-full h-[180px]">
                <div class="absolute bottom-0 left-0 w-full flex gap-2 px-2 py-3 bg-[#33333388]">
                    <img src="/assets/icons/WA.monumentos.svg" class="w-[20px] h-[20px]">
                    <p class="lato text-base font-bold leading-[20px] text-white">Monumento de la Tolerancia, 2.1 km</p>
                </div>
            </div>
        </div>
    </template>
    <template v-else>
        <PlacesRecStyleBCard />
    </template>
        

        <div 
            class="absolute top-2 right-2 bg-white rounded-[10px] p-1 shadow-hoster2"
            v-show="hoverSection && !inPanel"
            @mouseup.stop
        >
            <ToggleButton 
                v-model="rawSections.placesRecommendationSection.visibility" 
                id="placesRecommendationSection" textLeft="Visible"
                @change="updateOrderSections('placesRecommendationSection')"
            />
        </div>
    </section>
</template>
<script setup>
import { ref, inject } from 'vue'
import ToggleButton from '@/components/Buttons/ToggleButton.vue'
import PlacesRecStyleBCard from './PlacesRecStyleBCard.vue';        
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