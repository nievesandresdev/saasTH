<template>
<!-- max-h-[554px] -->
    <div class="w-full h-[80%] rounded-[10px] p-4 flex flex-col justify-between" style="box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);">
        <p class="text-[14px] leading-[150%]" v-html="textGenerateInSteaming" />
        <div>
            <transition>
                <div v-if="!disabledButtons" class="mt-4">
                    <p class="text-sm font-medium mb-2">Idioma original:</p>
                    <button
                        class="chip-primary py-2 px-[12px] rounded-[6px] text-sm font-medium leading-[110%] flex items-center cursor-pointer mb-4"
                        :class="{'chip-primary-active': true }"
                    >
                        <img
                            class="w-4 h-4 mr-2"
                            :src="`/assets/icons/flags/${'es'}.svg`"
                        >
                        Español
                    </button>
                    <p class="text-sm font-medium mb-2">Traducir a:</p>
                    <div class="flex space-x-4">
                        <button
                            class="chip-primary py-2 px-[12px] rounded-[6px] text-sm font-medium leading-[110%] flex items-center cursor-pointer"
                            :class="{'chip-primary-active': true }"
                        >
                            <img
                                class="w-4 h-4 mr-2"
                                :src="`/assets/icons/flags/${'es'}.svg`"
                            >
                            Español
                        </button>
                        <button
                            class="chip-primary py-2 px-[12px] rounded-[6px] text-sm font-medium leading-[110%] flex items-center cursor-pointer"
                            :class="{'chip-primary-active': true }"
                        >
                            <img
                                class="w-4 h-4 mr-2"
                                :src="`/assets/icons/flags/${'en'}.svg`"
                            >
                            Ingles
                        </button>
                    </div>
                </div>
            </transition>
            <div class="flex justify-end mt-2 w-full">
                <div
                    class="space-x-1 flex items-center"
                    
                >
                    <button
                        :class="{'opacity-35': disabledButtons}"
                        :disabled="disabledButtons"
                    >
                        <img
                            class="w-4 h-4 icon-inactive rotate-180"
                            :src="`/assets/icons/1.TH.NEXT.svg`"
                        >
                    </button>
                    <p class="text-base leading-[110%]" :class="{'opacity-25': !responseGenerated}">1/1</p>
                    <button
                        :class="{'opacity-35': disabledButtons}"
                        :disabled="disabledButtons"
                    >
                        <img
                            class="w-4 h-4"
                            :src="`/assets/icons/1.TH.NEXT.svg`"
                        >
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-4 text-end">
        <button
            :disabled="disabledButtons"
            class="text-xs font-medium hbtn-primary py-[12px] px-[8px]"
            @click="copyText()"
        >
            <img
                :class="{'opacity-35': disabledButtons}"
                src="/assets/icons/1.TH.COPY.svg"
                class="w-4 h-4 mR-1 inline-block"
            >
            Copiar
        </button>
        <button
            :disabled="disabledButtons"
            class="text-xs font-medium hbtn-primary py-[12px] px-[8px] ml-2"
            @click="generateNewResponse"
        >
            Generar otra respuesta
            <img
                :class="{'opacity-35': disabledButtons}"
                src="/assets/icons/1.TH.IA.svg"
                class="w-4 h-4 ml-1 inline-block"
            >
        </button>
    </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue';

// INJECT
const loadingHosty = inject('loadingHosty');
const streamingLiveData =  inject('streamingLiveData');
const responseGenerated =  inject('responseGenerated');

// COMPOSABLES
import { useCopy } from '@/composables/useCopy';
const copy = useCopy();

// DATA
const responseStringStreaming = ref('');

const textGenerateInSteaming = computed(() => {
        const match = /"review_response":"(.*)$/s.exec(responseStringStreaming.value);
        let textFormated = '';
        if (match) {
            // Extraer la parte del texto que ya está disponible
            let partialResponse = match[1].replace(/\\n/g, '\n'); // Manejo de saltos de línea
            partialResponse = partialResponse.replace(/\\"/g, '"'); // Manejo de comillas escapadas

            // Quitar cualquier parte incompleta al final (hasta el último carácter válido)
            const lastCompleteCharIndex = partialResponse.lastIndexOf('"');
            if (lastCompleteCharIndex !== -1) {
            partialResponse = partialResponse.substring(0, lastCompleteCharIndex);
            }

            // Mostrar la parte extraída en tiempo real
            textFormated = partialResponse;
        }
        return textFormated;
});

const disabledButtons = computed(() => {
    return !responseGenerated.value;
});

//FUNCTION
function generateNewResponse () {
    responseStringStreaming.value = "";
    responseGenerated.value = false;
    const VUE_APP_API_URL_REVIEW = process.env.VUE_APP_API_URL_REVIEW;
    const X_KEY_API = process.env.VUE_APP_X_KEY_API;

    const eventSource = new EventSource(`${VUE_APP_API_URL_REVIEW}/translateAndResponse/generateResponseStreaming`);

    eventSource.onmessage = (event) => {
        if (event.data === '[END]') {
            eventSource.close();
            responseGenerated.value = true;
        } else {
            responseStringStreaming.value += event.data;

        }
    };

    eventSource.onerror = (error) => {
    console.error('Error:', error);
    eventSource.close();
    };
}

function copyText () {
    copy.load(textGenerateInSteaming.value);
    toast.warningToast('Texto copiado','top-right');
}


</script>