<template>
    <div class="flex justify-start gap-2 ">
        <label class="text-sm font-medium">{{ props.label }}</label>
        <Tooltip :size="props.sizeTooltip" :top="props.tooltipTop" :left="props.tooltipLeft" v-if="!props.disabledTooltip" :size_custom="props.sizeCustom">
            <template v-slot:button>
                <img class="w-4 h-4" src="/assets/icons/info.blue.svg">
            </template>
            <template v-slot:content>
                <p class="text-sm text-[#333333]" v-html="props.tooltip"></p>
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
    tooltipTop: String,
    tooltipLeft: String,
    disabledTooltip: Boolean,
    sizeTooltip: {
        type: String,
        default: 'm'
    },
    sizeCustom : {
        type: String,
        default: null
    }
})
</script>

