<template>
    <ModalWindow :isVisible="isDeleteWorkPositions && data.relation" @close="closeDeleteWorkPositions" :width="'344px'" :paddingContent="'p-4'">
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
                    src="/assets/icons/warning-red.svg"
                    class="w-8 h-8"
                >
            </div>
            <p class="text-xl font-semibold mt-4 text-center mb-2">Este puesto está asignado</p>
            <p class="text-sm font-normal text-center leading-6">
                Ten en cuenta que si eliminas el puesto de trabajo deberás volver a crearlo para visualizarlo en la plataforma.
            </p>
            <div class="flex justify-center w-full mt-4">
                <div 
                    @click="closeDeleteWorkPositions" 
                    class="hbtn-primary py-3 px-4 w-full leading-4 cursor-pointer flex justify-center items-center"
                >
                    Aceptar
                </div>
            </div>
        </template>
    </ModalWindow>

    <ModalWindow :isVisible="isDeleteWorkPositions && !data.relation" @close="closeDeleteWorkPositions" :width="'344px'" :paddingContent="'p-4'">
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
            <p class="text-xl font-semibold mt-4 text-center mb-2">¿Estás seguro?</p>
            <p class="text-sm font-normal text-center leading-6">
                Ten en cuenta que si eliminas el puesto de trabajo deberás volver a crearlo para visualizarlo en la plataforma.
            </p>
            <div class="flex justify-between w-full mt-4">
                <button  @click.prevent="closeDeleteWorkPositions" class="hbtn-tertiary text-sm font-medium underline my-auto">
                  Cancelar
              </button>
                <div 
                    @click="submitDelete" 
                    class="hbtn-primary py-3 px-4 leading-4 cursor-pointer flex justify-center items-center text-[#333] text-sm"
                >
                    Sí, eliminar
                </div>
            </div>
        </template>
    </ModalWindow>
</template>

<script setup>
import {  defineEmits } from 'vue';
import ModalWindow from '@/components/ModalWindow.vue';
import { useToastAlert } from '@/composables/useToastAlert';
import { deleteWPosition } from '@/api/services/users/userSettings.service';

const toast = useToastAlert();

const emit = defineEmits(['storeWorkPosition', 'close', 'delete']);

const props = defineProps({
    isDeleteWorkPositions: Boolean,
    data: Object,
});

const closeDeleteWorkPositions = () => {
    emit('close');
};

const submitDelete = async () => {
    let params = {
        id: props.data.id,
    };

    console.log(params);

    const response = await deleteWPosition(params);

    if (response.ok) {
        toast.warningToast('Puesto de trabajo eliminado', 'top-right');
        emit('close');
        emit('delete', props.data.id);
    } else {
        toast.errorToast('Error al eliminar el puesto', 'top-right');
    }
};
</script>
