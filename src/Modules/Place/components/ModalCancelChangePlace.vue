<template>
    <ModalWindow v-if="open" :isVisible="open"  :width="'369px'" padding-content="p-6" footer="true">
        <template #content>
            <div>
                <div class="flex justify-end w-full">
                <button @click="closeModalProfile">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </div>
                <div class="text-center">
                    <img class="mx-auto h-8 w-8" src="/assets/icons/warning.svg" alt="Warning">
                    <h3 class="mt-4 text-[20px] font-semibold htext-black-100 leading-6">¿Descartar cambios?</h3>
                    <p class="mt-2 text-sm leading-[150%] htext-black-100">Tienes cambios sin guardar que se perderán si cancelas. ¿Estás seguro de que quieres cancelar?</p>
                </div>
            </div>
            <div class="mt-4 flex justify-between">
                <button @click="closeModal" class="hbtn-tertiary text-sm font-medium underline my-auto">
                    Descartar
                </button>
                
                <button  @click="submit" class="hbtn-primary px-4 py-3 text-sm leading-[110%] font-medium">
                    Guardar cambios
                </button>
            </div>
        </template>
  </ModalWindow>
</template>

<script setup>
    import { ref, reactive, onMounted, provide, computed, nextTick } from 'vue';
// COMPONENTS
import ModalWindow from '@/components/ModalWindow';

const emit = defineEmits(['submit:delete']);

const  props = defineProps({
});

// DATA
const open = ref(false);

//FUNCTIONS

function openModal () {
    open.value = true;
}
function closeModal () {
    open.value = false;
    emit('submit:closeModal');
}

function submit () {
    closeModal();
    emit('submit:saveChange');
}

defineExpose({ openModal });

</script>