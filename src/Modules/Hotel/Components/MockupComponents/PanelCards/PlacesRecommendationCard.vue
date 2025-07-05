<template>
    <div class="flex gap-2 items-start">
        <div class="border hborder-gray-400 rounded-[10px] w-[359px] p-1 cursor-pointer">
            <PlacesRecSection inPanel v-if="rawSections && true" @updateOrderSections="updateOrderSectionsLocal"/>
        </div>
        <div class="p-1" @mouseup.stop>
            <ToggleButton 
                v-model="rawSections.placesRecommendationSection.visibility" 
                id="placesRecommendationSection" textLeft="Visible"
            />
        </div>
    </div>
</template>
<script setup>
import { ref, inject } from 'vue'
import PlacesRecSection from '../PlacesRecSection.vue';
import ToggleButton from '@/components/Buttons/ToggleButton.vue';
const rawSections = inject('rawSections')
const emit = defineEmits(['updateOrderSections'])

const updateOrderSectionsLocal = (newOrder) => {
    emit('updateOrderSections', newOrder)
}
</script>