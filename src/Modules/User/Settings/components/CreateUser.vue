<template lang="">
    <transition>
        <div
            v-if="modal_add"
            class="absolute  bg-white shadow-xl add flex-column "
            :style="`top: ${containerTop}px; right: 0; min-height: calc(100vh - ${containerTop}px); height: calc(100vh - ${containerTop}px); z-index: 10;`"
            ref="ref_section_add"
        >
            <div class="overflow-y-auto scrolling-sticky" style="height: calc(100% - 72px)">
                <div class="flex justify-between items-center px-6 py-4 mt-4">
                    <div class="flex-1 text-center">
                        <h1 class="font-[600] text-xl">Crear usuario</h1>
                    </div>
                    <div class="flex justify-end">
                        <button class="" @click="closeModal">
                            <img
                                src="/assets/icons/1.TH.CLOSE.svg" alt="icon_close"
                                class="w-5 h-5"
                            >
                        </button>
                    </div>
                </div>

                <div class="p-6">
                    <hr class="mb-4">
                    <div class="flex items-center justify-between px-4 mb-5">
                        <div v-for="(step, index) in steps" :key="step.number" class="relative flex flex-col items-center">
                            <div :class="['w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold z-10', currentStep >= step.number ? 'bg-[#34A98F] text-white' : 'bg-white text-black border border-black']">
                                {{ step.number }}
                            </div>
                            <div :class="['text-sm mt-2', currentStep >= step.number ? 'text-black' : 'text-gray-500']" class="font-semibold">
                                {{ step.label }}
                            </div>
                            <!-- border -->
                            <div v-if="index !== steps.length - 1" :class="['absolute w-[170px] h-0 border top-5 left-3', currentStep >= (step.number + 1) ? 'border-[#34A98F]' : '']"></div>
                        </div>
                    </div>
                    <hr class="mb-5">
                        <div v-if="currentStep === 1">

                        </div>
                        <div v-if="currentStep === 2">
                            
                        </div>
                        <div v-if="currentStep === 3">
                            
                        </div>
                </div>

            </div>

            <div class="py-4 px-6 w-full flex justify-between border-t border-gray z-[1000] bg-white" style="height: 72px;">
                <button
                    class="px-4 py-2.5 font-medium rounded w-full bg-hoster-gray text-black "
                    @click="prevStep"
                    v-if="currentStep > 1"
                >
                    Anterior
                </button>
                <button
                    class="px-4 py-2.5 font-medium rounded w-full text-black"
                    @click="currentStep === 3 ? handleStoreUser() : nextStep()"
                    :disabled="isFormIncomplete"
                    :class="isFormIncomplete ? 'bg-gray-300 text-gray-400' : 'hbtn-cta text-black '"
                >
                    {{ currentStep === 3 ? 'Crear Usuario' : 'Siguiente' }}
                </button>
            </div>

        </div>
    </transition>


</template>
<script setup>
import {  ref, onMounted,nextTick,defineEmits } from 'vue'

const emits = defineEmits(['close']);

const props = defineProps({
    modal_add: Boolean
})

function closeModal() {
  emits('close');
}

const isFormIncomplete = ref(false);

const currentStep = ref(1);
const steps = [
  { number: 1, label: 'Usuario' },
  { number: 2, label: 'Hoteles' },
  { number: 3, label: 'Accesos' }
];

/* const permissions = [
    {name: 'Configuracion' , tooltip : 'Permite al usuario acceder y modificar la configuración general del hotel.' , value: 'configuracion'},
    {name: 'Estancias' , tooltip : 'Permite al usuario operar las estancias y responder chats con los huéspedes.' , value: 'estancias'},
    {name: 'Reseñas' , tooltip : 'Permite al usuario visualizar y responder nuevas reseñas.' , value: 'resenas'},
    {name: 'Análisis', tooltip : 'Permite al usuario acceder al análisis de tu resputación online' , value: 'analisis'},
] */


const nextStep = () => {
  if (currentStep.value < steps.length) currentStep.value++;
};

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--;
};


const containerTop = ref(0)

onMounted(async () => {
    await nextTick()

    const sectionExpElement = document.getElementById('layout-hoster')
    if (sectionExpElement) {
        containerTop.value = sectionExpElement.offsetTop
    }

})

</script>

<style lang="scss">
.add{
        width: 500px;
        position: fixed;
        // height: max-content;
        // min-height: 100%;
    }

    .v-enter-active,
    .v-leave-active {
        transition: transform 0.5s ease;
    }

    .v-enter-from,
    .v-leave-to {
        transform: translateX(100%);
    }



    .scrolling-sticky {
        &::-webkit-scrollbar {
        -webkit-appearance: none;
        }
        &::-webkit-scrollbar:vertical {
            width:16px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #BFBFBF;
            border-radius: 20px;
            border: 4px solid #fff;
        }
        &::-webkit-scrollbar-track {
            border-radius: 10px;
            background-color: #fff;
        }
        &::-webkit-scrollbar:horizontal{
            width:0;
            height: 0;
        }
    }
</style>
