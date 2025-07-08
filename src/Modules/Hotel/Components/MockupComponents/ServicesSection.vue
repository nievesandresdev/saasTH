<template>
    <section
        class="relative border-4 border-transparent" 
        @mouseenter="hoverSection = true" 
        @mouseleave="hoverSection = false" 
        @click="currentSection = 'servicesSection'"
        :class="{
            'p-1': !inPanel,
            'shadow-hoster2 cursor-pointer': hoverSection && !inPanel,
            'hborder-green-600': currentSection === 'servicesSection' && !inPanel,
            'rounded-[10px]': (currentSection === 'servicesSection' || hoverSection) && !inPanel,
        }"
    >
        <template v-if="rawSections.servicesSection.style == 1">
            <div class="flex items-center">
                <img src="/assets/icons/WA.servicios.svg" class="w-[24px] h-[24px] mr-2">
                <h2 class="lato text-[20px] font-bold leading-[28px]">
                    Servicios
                </h2>
            </div>
            <div class="mt-2 shadow-hoster rounded-[10px] px-2 pt-2 pb-4 flex items-center gap-2">
                <div class="">
                    <h2 class="lato text-[16px] font-bold leading-[20px]">
                        Tu experiencia, al siguiente nivel
                    </h2>
                    <p class="mt-2 lato text-[14px] leading-[16px] text-[#777]">
                        Relájate y aprovecha al máximo cada servicio pensado para ti.
                    </p>
                    <div class="flex gap-2 mt-4 items-center">
                        <p class="lato text-[14px] font-bold leading-[16px]">
                            Descubrir servicios
                        </p>
                        <img src="/assets/icons/arrow-right-long.svg" alt="" class="w-[16px] h-[16px]">
                    </div>
                </div>
                <img src="/assets/img/mockup-home-services.png" alt="" class="w-[115px] h-[112px] flex-shrink-0">
            </div>
        </template>
        <template v-else>
            <ServicesStyleBCard />
        </template>
        <div 
            class="absolute top-2 right-2 bg-white rounded-[10px] p-1 shadow-hoster2"
            v-show="hoverSection && !inPanel"
            @mouseup.stop
        >
            <ToggleButton 
                v-model="rawSections.servicesSection.visibility" 
                id="servicesSection" textLeft="Visible"
                @change="updateOrderSections('servicesSection')"
            />
        </div>
    </section>
</template>
<script setup>
import { ref, inject } from 'vue'
import ToggleButton from '@/components/Buttons/ToggleButton.vue'
import ServicesStyleBCard from './ServicesStyleBCard.vue';

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
