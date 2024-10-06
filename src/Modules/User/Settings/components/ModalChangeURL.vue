<template>
    <ModalWindow v-if="open" :isVisible="open"  :width="'520px'" padding-content="p-6" footer="true">
        <template #content>
            <div>
                <div class="flex justify-between w-full items-center">
                    <h3 class="mt-4 text-[20px] font-semibold htext-black-100 leading-6 ml-[50px] mb-[14px]">Solicitud de cambio de enlace</h3>
                <button @click="closeModal" class="rounded-full hover:bg-[#F3F3F3] p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                
                </div>
                <div class="text-center mt-5">
                    <!-- <img class="mx-auto h-8 w-8" src="/assets/icons/warning.svg" alt="Warning"> -->
                    <!-- <h3 class="mt-4 text-[20px] font-semibold htext-black-100 leading-6">Solicitud de cambio de enlace</h3> -->
                    <p class="mt-2 text-sm leading-[150%] htext-black-100 text-left">Para asegurar una correcta gestión de las reseñas, permitimos modificar el enlace en cada plataforma externa hasta un máximo de 3 veces. Esto se debe a que cada modificación conlleva un proceso de descarga, lo cual implica un coste adicional.<br><br>Si necesitas actualizar el enlace nuevamente, puedes solicitar un cambio a través del botón. Nos pondremos en contacto para gestionar la solicitud.</p>
                </div>
            </div>
            <div class="mt-4 flex justify-between">
                <button @click="closeModal" class="hbtn-primary px-4 py-3 text-sm leading-[110%] font-medium">
                    Cancelar
                </button>
                <button  @click="submit" class="hbtn-cta px-4 py-3 text-sm leading-[110%] font-medium rounded-md">
                    Solicitar Cambio
                </button>
            </div>
        </template>
  </ModalWindow>
</template>

<script setup>
    import { ref, reactive, onMounted, provide, computed, nextTick } from 'vue';
// COMPONENTS
import ModalWindow from '@/components/ModalWindow';

const emit = defineEmits(['submit:change', 'close:change']);

const  props = defineProps({
    open: Boolean,
});


function submit () {
    emit('submit:change');
}

function closeModal () {
    emit('close:change');
}


</script>