<script setup>
  import { defineProps,computed } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'button',
    },
    active: {
        type: Boolean,
        default: false,
    },
});

const activeClass = computed(() => {
    return props.active ? 'border-green-700 hbg-green-200 htext-green-600' : 'border-black';
});
</script>

<template>
    <div
        :type="props.type"
        class="border p-2 text-sm font-medium leading-[110%] rounded-[6px] mt-5 cursor-pointer"
        :class="activeClass"
    >
        <slot />
    </div>
</template>
