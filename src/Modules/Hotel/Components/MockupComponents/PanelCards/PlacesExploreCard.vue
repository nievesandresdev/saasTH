<template>
    <div class="flex gap-2 items-start">
        <div class="border hborder-gray-400 rounded-[10px] w-[359px] p-1">
            <PlacesExploreSection inPanel v-if="rawSections && true"/>
        </div>
        <div class="p-1">
            <ToggleButton 
                v-model="rawSections.placesExploreSection.visibility" 
                id="placesExploreSection" textLeft="Visible"
            />
        </div>
    </div>
</template>
<script setup>
import { ref, inject } from 'vue'
import PlacesExploreSection from '../PlacesExpSection.vue';
import ToggleButton from '@/components/Buttons/ToggleButton.vue';
const rawSections = inject('rawSections')
</script>