<template>
    <div class="flex gap-2 items-start">
        <div class="border hborder-gray-400 rounded-[10px] w-[359px] p-1 pb-2 cursor-pointer">
            <div class="flex items-center gap-2 mb-2">
                <img src="/assets/icons/circle-dot.svg" alt="arrow" class="w-6 h-6">
                <p class="lato text-[20px] font-bold leading-[18px]">Botones</p>
                
            </div>
            <ButtonsSection inPanel v-if="rawSections && true" @updateOrderSections="updateOrderSectionsLocal"/>
        </div>
        <div class="p-1" @mouseup.stop>
            <ToggleButton 
                v-model="rawSections.buttonsSection.visibility" 
                id="buttonsSection" textLeft="Visible"
            />
        </div>
    </div>
</template>
<script setup>
import { ref, inject } from 'vue'
import ButtonsSection from '../ButtonsSection.vue';
import ToggleButton from '@/components/Buttons/ToggleButton.vue';
const rawSections = inject('rawSections')
const emit = defineEmits(['updateOrderSections'])

const updateOrderSectionsLocal = (newOrder) => {
    emit('updateOrderSections', newOrder)
}
</script>