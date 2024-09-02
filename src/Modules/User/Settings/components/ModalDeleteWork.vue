<template>
    <ModalWindow  :isVisible="isDeleteWorkPositions" @close="closeDeleteWorkPositions">
        <template #content>
        <div class="flex justify-end">
            <img
                src="/assets/icons/1.TH.CLOSE.svg"
                class="w-6 h-6 cursor-pointer"
                @click="closeDeleteWorkPositions"
            >
        </div>
        <div class="flex justify-center mb-4">
            <img
            src="/assets/icons/warning.svg"
            class="w-8 h-8"
            >
        </div>
        <p class="text-xl font-semibold mt-4 text-center mb-2">Este puesto está siendo usado</p>
        <p class="text-sm font-normal text-left">Este puesto está en uso. ¿Deseas eliminarlo? Recuerda que siempre puedes editarlo.</p>
        <div class="flex justify-between mt-4">
            <div @click="closeDeleteWorkPositions" class="hbtn-tertiary text-sm font-medium underline my-auto cursor-pointer">
            Cancelar
            </div>
            <div @click="submitDelete" class="hbtn-primary py-3 px-4 leading-4 cursor-pointer">
            Eliminar
            </div>
        </div>
        </template>
    </ModalWindow>
</template>

<script setup>

import { ref,defineEmits } from 'vue';
import ModalWindow from '@/components/ModalWindow.vue';
import { useToastAlert } from '@/composables/useToastAlert'
import { deleteWPosition } from '@/api/services/users/userSettings.service';

const toast = useToastAlert();

const emit = defineEmits(['storeWorkPosition','close','delete']);

const props = defineProps({
    isDeleteWorkPositions: Boolean,
    id : Number
});

const closeDeleteWorkPositions = () => {
    emit('close');
}

const submitDelete = async() => {
    let params = {
        id: props.id
    }

    const response = await deleteWPosition(params);

    if(response.ok){
        toast.warningToast('Cambios guardados con éxito','top-right')
        emit('close');
        emit('delete');
    }else{
        toast.errorToast('Error al eliminar el puesto','top-right')
    }
    
}
</script>