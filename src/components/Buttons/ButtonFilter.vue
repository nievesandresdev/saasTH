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
    return props.active ? 'border-[#2A8873] hbg-green-200 text-[#34A98F]' : 'border-black';
});
</script>

<template>
    <div
        :type="props.type"
        class="border p-2 text-sm font-medium leading-[110%] rounded-[6px] mt-5 cursor-pointer hover:border-[#34A98F] hover:text-[#34A98F]"
        :class="activeClass"
    >
        <slot />
    </div>
</template>
