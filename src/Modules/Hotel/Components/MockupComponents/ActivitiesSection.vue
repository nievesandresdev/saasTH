<template>
    <section
        class="relative border-4 border-transparent" 
        @mouseenter="hoverSection = true" 
        @mouseleave="hoverSection = false" 
        @click="currentSection = 'activitiesSection'"
        :class="{
            'px-1 pt-1': !inPanel,
            'shadow-hoster2 cursor-pointer': hoverSection && !inPanel,
            'hborder-green-600': currentSection === 'activitiesSection' && !inPanel,
            'rounded-[10px]': (currentSection === 'activitiesSection' || hoverSection) && !inPanel,
        }"
    >
        <div class="flex items-center">
            <img src="/assets/icons/WA.experiencias.svg" class="w-[24px] h-[24px] mr-2">
            <h2 class="lato text-[20px] font-bold leading-[28px]">
                Actividades
            </h2>
            <span 
                class="lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px] underline hover:underline ml-auto"
            >
                Ver todo
            </span>
        </div>
        <div class="flex mt-2 overflow-hidden">
            <img src="/assets/img/2.WA.CardExperiencias.Carrousel.png" alt="" class="w-[248px] h-[333px] flex-shrink-0">
            <img src="/assets/img/2.WA.CardExperiencias.Carrousel.png" alt="" class="w-[248px] h-[333px] flex-shrink-0">
        </div>

        <div 
            class="absolute top-2 right-2 bg-white rounded-[10px] p-1 shadow-hoster2"
            v-show="hoverSection && !inPanel"
        >
            <ToggleButton 
                v-model="rawSections.activitiesSection.visibility" 
                id="activitiesSection" textLeft="Visible"
                @change="updateOrderSections"
            />
        </div>
    </section>
</template>
<script setup>
import { ref, inject } from 'vue'
import ToggleButton from '@/components/Buttons/ToggleButton.vue'

const emit = defineEmits(['updateOrderSections'])

const props = defineProps({
    inPanel: {
        type: Boolean,
        default: false,
    },
})

const hoverSection = ref(false)
const rawSections = inject('rawSections')
const currentSection = inject('currentSection')

function updateOrderSections() {
    emit('updateOrderSections')
}

</script>