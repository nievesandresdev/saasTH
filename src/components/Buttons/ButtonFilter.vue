<script setup>
  import { defineProps } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'button',
    },
    borderColor: {
        type: String,
        default: 'border-black',
    },
});
</script>

<template>
    <button
        :type="props.type"
        class="border p-2 text-sm font-medium leading-[110%] rounded-[6px] mt-5"
        
    >
        <slot />
    </button>
</template>
