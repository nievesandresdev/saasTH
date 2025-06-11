<template>
    <ModalWindow v-if="props.open" :isVisible="props.open"  :width="'344px'" padding-content="p-0" footer="true" >
        <template #content>
            <div class="flex justify-between p-4">
                <span class="text-[20px] font-semibold">
                    ¿Necesitas cambiar la URL?
                </span>
                <button @click="closeModalNotEdit">
                    <img src="/assets/icons/1.TH.CLOSE.svg" alt="1.TH.CLOSE" class="h-6 w-6">
                </button>
            </div>
            <p class="text-sm font-normal px-4 pb-4">
                Encontrarás atención personalizada llamando al teléfono +34 644 237 564 o a la direccón de correo electrónico info@thehoster.io<br>
                Nuestro horario de atención es de lunes a jueves de 8:30 a 18:30 y los viernes de 8:30 a 14:30. Estaremos encantados de poder ayudarte
            </p>
        </template>
    </ModalWindow>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
import ModalWindow from '@/components/ModalWindow';

const props = defineProps({
    open: {
        type: Boolean,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(['close']);

const closeModalNotEdit = () => {
    emit('close');
};

</script>



