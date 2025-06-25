<template>
    <div class="flex gap-2 items-start">
        <div class="border hborder-gray-400 rounded-[10px] w-[359px] px-1 pt-1">
            <ActivitiesSection inPanel v-if="rawSections && true" @updateOrderSections="updateOrderSectionsLocal"/>
        </div>
        <div class="p-1">
            <ToggleButton 
                v-model="rawSections.activitiesSection.visibility" 
                id="activitiesSection" textLeft="Visible"
            />
        </div>
    </div>
</template>
<script setup>
import { ref, inject } from 'vue'
import ActivitiesSection from '../ActivitiesSection.vue';
import ToggleButton from '@/components/Buttons/ToggleButton.vue';
const rawSections = inject('rawSections')
const emit = defineEmits(['updateOrderSections'])

const updateOrderSectionsLocal = (newOrder) => {
    emit('updateOrderSections', newOrder)
}
</script>