<template>
    <ModalWindow
        v-if="isOpen"
        :isVisible="isOpen" 
        :width="'344px'"
        padding-content=""
        footer="true"
        @close="closeModal()"
    >
        <template #content>
            <div class="p-4 space-y-4">
                <div class="flex justify-between w-full">
                    <h2 class="text-[20px] font-semibold">Añadir alojamiento</h2>
                    <button @click="closeModal">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="space-y-2">
                    <p class=" text-sm leading-[150%] htext-black-100">Si necesitas añadir otro alojamiento, ponte en contacto con nosotros.</p>
                    <p class=" text-sm leading-[150%] htext-black-100">Encontrarás atención personalizada llamando al teléfono  +34 624 149 605 o a la direccón de correo electrónico info@thehoster.io</p>
                    <p class=" text-sm leading-[150%] htext-black-100">Nuestro horario de atención es de lunes a jueves de 8:30 a 18:30 y los viernes de 8:30 a 14:30. Estaremos encantados de poder ayudarte</p>
                </div>
            </div>
        </template>
    </ModalWindow>
</template>

<script setup>
import { ref } from 'vue';
import ModalWindow from "@/components/ModalWindow.vue";

const isOpen = ref(false);

function closeModal () {
    isOpen.value = false;
}
function open () {
    isOpen.value = true;
}
defineExpose({ open });
</script>