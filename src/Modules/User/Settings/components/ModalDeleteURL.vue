<template>
    <ModalWindow v-if="open" :isVisible="open"  :width="'369px'" padding-content="p-6" footer="true">
        <template #content>
            <div>
                <div class="flex justify-end w-full ">
                    <button @click="closeModal">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:bg-[#F3F3F3] rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="text-center">
                    <img class="mx-auto h-8 w-8" src="/assets/icons/warning.svg" alt="Warning">
                    <h3 class="mt-4 text-[20px] font-semibold htext-black-100 leading-6">¿Eliminar enlace?</h3>
                    <p class="mt-2 text-sm leading-[150%] htext-black-100">En caso de eliminar el enlace no podrás visualizar las reseñas de {{ nameOTA }}. Para volver a mostrarlas tendrás que añadirlo nuevamente.</p>
                </div>
            </div>
            <div class="mt-4 flex justify-between">
                <button @click="closeModal" class="hbtn-tertiary text-sm font-medium underline my-auto">
                    No, cancelar
                </button>
                
                <button  @click="submit" class="hbtn-primary px-4 py-3 text-sm leading-[110%] font-medium">
                    Si, eliminar
                </button>
            </div>
        </template>
  </ModalWindow>
</template>

<script setup>
    import { ref, reactive, onMounted, provide, computed, nextTick } from 'vue';
// COMPONENTS
import ModalWindow from '@/components/ModalWindow';

const emit = defineEmits(['submit:delete', 'close:modal']);

const  props = defineProps({
    open: Boolean,
    nameOTA: String
});


function submit () {
    emit('submit:delete');
}

function closeModal () {
    emit('close:modal');
}


</script>