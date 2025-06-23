<template>
    <section 
        class="relative border-4 border-transparent" 
        @mouseenter="hoverSection = true" 
        @mouseleave="hoverSection = false" 
        @click="currentSection = 'socialNetworksSection'"
        :class="{
            'p-1': !inPanel,
            'shadow-hoster2 cursor-pointer': hoverSection && !inPanel,
            'hborder-green-600': currentSection === 'socialNetworksSection' && !inPanel,
            'rounded-[10px]': (currentSection === 'socialNetworksSection' || hoverSection) && !inPanel,
        }"
    >
        <div class="flex items-center">
            <img src="/assets/icons/Like.svg" class="w-[24px] h-[24px] mr-2">
            <h2 class="lato text-[20px] font-bold leading-[28px]">
                Nuestras redes
            </h2>
        </div>
        <div class="mt-4 flex items-center justify-between px-4">
            <template v-for="button in buttons" :key="button.label" >
                <span class="flex items-center p-2 gap-1 sp:gap-2 border border-white bg-gradient-h shadow-md rounded-full">
                    <img :src="button.icon" class="w-8 h-8" alt="Icon" />
                </span>
            </template>
        </div>

        <div 
            class="absolute top-2 right-2 bg-white rounded-[10px] p-1 shadow-hoster2"
            v-show="hoverSection && !inPanel"
        >
            <ToggleButton 
                v-model="rawSections.socialNetworksSection.visibility" 
                id="socialNetworksSection" textLeft="Visible"
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


const buttons = [
    {
        icon: '/assets/icons/WA.instagram.svg',
    },
    {
        icon: '/assets/icons/WA.facebook.svg',
    },
    {
        icon: '/assets/icons/WA.pinterest.svg',
    },
    {
        icon: '/assets/icons/WA.twitter.svg',
    },
]
</script>
<style scoped>
.bg-gradient-h {
    background: linear-gradient(180deg, #F3F3F3 0%, #FAFAFA 100%);
}
</style>