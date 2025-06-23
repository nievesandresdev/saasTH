<template>
    <BaseSlidePanel :open="isOpenSidePanel">
        <SidePanelSlide @openConfig="$emit('openConfig')" :destacadoData="destacadoData"  />
    </BaseSlidePanel>
</template>

<script setup>
import { inject, defineEmits } from 'vue';
import BaseSlidePanel from '@/components/BaseSlidePanel.vue';
import SidePanelSlide from './SidePanelSlide.vue';

const isOpenSidePanel = inject('isOpenSidePanel');

const props = defineProps({
    destacadoData: {
        type: Object,
        required: true
    }
});

defineEmits(['openConfig']);
</script> 