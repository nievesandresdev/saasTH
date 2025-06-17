<template>
    <Transition name="slide">
        <div v-if="open" class="fixed inset-y-0 right-0 w-[500px] bg-white shadow-xl z-[2000]">
            <slot></slot>
        </div>
    </Transition>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    open: {
        type: Boolean,
        default: false
    }
});
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
    transform: translateX(0);
}
</style> 