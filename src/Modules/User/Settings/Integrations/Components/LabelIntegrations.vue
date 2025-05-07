<template>
    <div class="flex justify-start gap-2">
        <label class="text-sm font-medium">{{ props.label }}</label>
        <Tooltip size="l" :top="25" :left="5">
            <template v-slot:button>
                <img class="w-4 h-4" src="/assets/icons/info.blue.svg">
            </template>
            <template v-slot:content>
                <p class="text-sm text-[#333333]">{{ props.tooltip }}</p>
            </template>
        </Tooltip>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import Tooltip from '@/components/Tooltip.vue';

const props = defineProps({
    label: String,
    tooltip: String,
})
</script>

