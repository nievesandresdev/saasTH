<template>
    <div>
        <div 
            v-if="loading"
            :class="`${sizeClasses} hbg-gray-500 rounded animate-pulse inline-block`" 
        ></div>
        <div 
            v-else
            :class="`${sizeClasses} cursor-pointer inline-block`"
        >
            <img 
                v-if="isChecked" 
                @click="toggleCheck"
                src="/assets/icons/1.TH.Checkbox.svg" 
                class="w-full h-full"
                :class="{'opacity-50': isDisabled}"
            >
            
            <div
                v-else
                class="border rounded w-full h-full hborder-black-100 hover-green-200"
                :class="{'opacity-50': isDisabled}"
                @click="toggleCheck"
            ></div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: Boolean,
    loading: Boolean,
    isDisabled: {
        type: Boolean,
        default: false
    },
    sizeClasses: {
        type: String,
        default: 'w-4 h-4'
    },
});

const isChecked = ref(props.modelValue);

const emit = defineEmits(['update:modelValue', 'change']);

// Watcher para actualizar isChecked cuando modelValue cambia
watch(() => props.modelValue, (newValue) => {
    isChecked.value = newValue;
}, { immediate: true });

function toggleCheck() {
    if (!props.isDisabled) {
        isChecked.value = !isChecked.value;
        emit('update:modelValue', isChecked.value);
        emit('change');
    }
}
</script>
