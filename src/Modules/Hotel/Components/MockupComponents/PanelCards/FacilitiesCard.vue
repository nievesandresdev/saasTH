<template>
    <div class="flex gap-2 items-start">
        <div class="border hborder-gray-400 rounded-[10px] w-[359px] px-1 pt-1">
            <FacilitiesSection inPanel v-if="rawSections && true"/>
        </div>
        <div class="p-1">
            <ToggleButton 
                v-model="rawSections.facilitiesSection.visibility" 
                id="facilitiesSection" textLeft="Visible"
            />
        </div>
    </div>
</template>
<script setup>
import { ref, inject } from 'vue'
import FacilitiesSection from '../FacilitiesSection.vue';
import ToggleButton from '@/components/Buttons/ToggleButton.vue';
const rawSections = inject('rawSections')
</script>