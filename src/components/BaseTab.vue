<template>
    <ul
        class="flex space-x-2 border-b hborder-gray-400"
    >
        <li
            v-for="(item ,index) in items"
            :key="index"
            class="cursor-pointer px-4 pt-4 rounded-t-[10px] flex flex-col"
            :class="value === item.value ? 'hbg-green-200' : ''"
            @click="changeTab(item.value)"
        >
                <span
                class="text-base font-semibold"
                :class="value === item.value ? 'htext-green-800 pb-[8px]' : 'htext-black-100'"
            >
                    {{ item.name }}
            </span>
            <span class="w-full h-[3px] rounded-full" :class="value === item.value ? 'hbg-green-800' : ''" />
        </li>
    </ul>
</template>

<script setup>

    import { computed, ref } from 'vue';

    const emit = defineEmits(['update:modelValue']);

    const props = defineProps({
        items: {
            type: Array,
            default: () => ([]),
        },
        modelValue: {
            type: Boolean,
            default: false,
        },
    });


    const value = computed({
        get: () => props.modelValue,
        set: (val) => emit('update:modelValue', val),
    });

    // FUNCTIONS
    function changeTab (val) {
        value.value = val
    }

</script>