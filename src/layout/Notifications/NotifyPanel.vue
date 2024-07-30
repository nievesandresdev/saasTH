<template>
    <transition name="slide" @after-leave="$emit('close')">
        <aside v-if="isVisible" class="w-[400px] bg-white fixed top-0 right-0 h-screen overflow-y-auto z-[2100]">
            <div class="py-5 flex items-center justify-between px-6 border-b border-gray-400">
                <h2 class="text-[22px] font-medium leading-[110%]">Novedades</h2>
                <button @click="isVisible = false">Cerrar</button>
            </div>
            <div class="px-6">
                <!-- Cuerpo del panel -->
            </div>
        </aside>
    </transition>
    <transition name="fade">
        <div v-if="isVisible" class="fixed top-0 left-0 w-screen h-screen bg-[#00000088] z-[2000]" @click="isVisible = false"></div>
    </transition>
</template>

<script setup>
import { ref, inject } from 'vue';

const isVisible = inject('isNotifyPanelVisible');
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
    transition: right 0.3s;
}
.slide-enter-from, .slide-leave-to {
    right: -400px;
}
.slide-enter-to, .slide-leave-from {
    right: 0;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
.fade-enter-to, .fade-leave-from {
    opacity: 1;
}
</style>
