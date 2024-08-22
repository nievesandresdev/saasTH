<template>
    <div class="aside h-[100%] fixed w-[354px] bg-white top-0 overflow-y-auto">
        <div class="px-[24px] py-[18px] border-b-[2px] border-[#BFBFBF] flex space-x-4">
            <img class="w-[52px] h-[52px]" src="/assets/img/hosty.png" alt="hosty">
            <div class="">
                <h1 class="text-base font-semibold leading-[130%]">¡Hosty trabajará por ti! </h1>
                <p class="text-sm font-medium leading-[140%]">Genera, copia y responde</p>
            </div>
        </div>
        <div
            class="w-full flex h-full"
            :class="loadingHosty ? 'items-center justify-center' : 'pt-6 px-6 pb-[68px] flex-col'"
        >
            <div v-if="!loadingHosty && numbersResponsesGenerated <= 0" class="text-center">
                <button
                    class="text-xs font-medium hbtn-primary py-[12px] px-[8px]"
                    @click="generateResponse"
                >
                    Generar con Hosty
                    <img
                        src="/assets/icons/1.TH.IA.svg"
                        class="w-4 h-4 ml-1 inline-block"
                    >
                </button>
            </div>
            <BaseLoadingScroll class="w-[60px] h-[60px]" v-if="loadingHosty" />
            <template v-if="!loadingHosty && responseReviewData.length > 0">
                <DetailPageAsideHostyResponseStreaming
                    ref="refDetailPageAsideHostyResponseStreaming"
                    @generateResponse="generateResponse"
                />
            </template>

        </div>

    </div>
</template>

<script setup>
import { ref, provide, inject, computed, watch } from 'vue';

// COMPONENTS
import BaseLoadingScroll from '@/components/BaseLoadingScroll';
import DetailPageAsideHostyResponseStreaming from './DetailPageAsideHostyResponseStreaming';

// STATE
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { useReviewResponseStore } from '@/stores/modules/reviewResponse';
const reviewResponseStore = useReviewResponseStore();

// INJECT
const languageActiveResponse  = inject('languageActiveResponse');
const responseReviewData = inject('responseReviewData');
const otaParamRoute = inject('otaParamRoute');
const reviewData = inject('reviewData');
const reviewStore = inject('reviewStore');
const numbersResponsesGenerated = inject('numbersResponsesGenerated');

// DATA
const refDetailPageAsideHostyResponseStreaming =ref(null);
const loadingHosty = ref(false);
const loadingStreaming = ref(false);
const loadingTranslation = ref(false);
const responseGenerated = ref(false);
const responseStringStreaming = ref("");
const pageCurrent = ref(1);

// COMPUTED

const responseCurrent = computed(() => {
    let response = {};
    if (responseReviewData.value?.length) {
        let index = pageCurrent.value - 1;
        response = responseReviewData.value?.[index];
    }
    return response;
});

const textGenerateInSteaming = computed(() => {
    if (!responseStringStreaming.value) return "";
        if (!responseStringStreaming.value.includes('"')) {
            return responseStringStreaming.value;
        }
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

// WATCH
watch(responseReviewData, (responses)=>{
    	if (responses?.length) {
            responseStringStreaming.value = responses?.[0].originalLanguage;
        }
});

// PROVIDE

provide('responseCurrent', responseCurrent);
provide('pageCurrent', pageCurrent);
provide('loadingHosty', loadingHosty);
provide('loadingStreaming', loadingStreaming);
provide('loadingTranslation', loadingTranslation);
provide('responseGenerated', responseGenerated);
provide('responseStringStreaming', responseStringStreaming);
provide('textGenerateInSteaming', textGenerateInSteaming);

// FUNCTION

async function loadResponses () {
    let params = {
        ota: otaParamRoute.value,
        reviewId: reviewData.value.id,
    }
    const response = await reviewResponseStore.$getAll(params);
    const { ok , data } = response;
    if (ok) {
        if (data?.responses?.length) {
            responseReviewData.value = data?.responses;
        }
    }
}
async function generateResponse () {

    if (!reviewData.value?.languageOrigin) {
        await loadLanguageInReview();
    }
    responseStringStreaming.value = "";
    loadingHosty.value = true;
    responseGenerated.value = false;
    const VUE_APP_API_URL_REVIEW = process.env.VUE_APP_API_URL_REVIEW;
    const X_KEY_API = process.env.VUE_APP_X_KEY_API;

    let url = `${VUE_APP_API_URL_REVIEW}/reviewResponses/generateInStreaming?objectIdReview=${reviewData.value._id}&googleMapCid=${hotelStore.hotelData.code}&ota=${otaParamRoute.value}&hotelName=${hotelStore.hotelData.name}`;

    const eventSource = new EventSource(url);
    eventSource.onmessage = (event) => {
        if (event.data === '[END]') {
            eventSource.close();
            responseGenerated.value = true;
            loadingStreaming.value = false;
            // setTimeout(() => {
            //     }, 500);
            loadResponses();
            resetDataDefault();
        } else {
            if (!responseReviewData.value?.length) {
                responseReviewData.value.push({
                    originalLanguage: '',
                    es: null,
                    en: null,
                    _id: null,
                }   );
            }
            loadingHosty.value = false;
            loadingStreaming.value = true;
            responseStringStreaming.value += event.data;  
        }
    };



    eventSource.onerror = (error) => {
        console.error('Error:', error);
        responseGenerated.value = true;
        loadingStreaming.value = false;
        eventSource.close();
            loadResponses();
            resetDataDefault();
    };
}

async function loadLanguageInReview () {
    let bodyRequest = {
        ota: otaParamRoute.value,
        reviewId: reviewData.value?.id
    }
    const response = await reviewStore.$updateLanguage(bodyRequest);
    const { ok, data } = response;
    if (ok) {
        reviewData.value.languageOrigin = data.language;
    }

}

function resetDataDefault () {
    languageActiveResponse.value = 'originalLanguage';
    responseStringStreaming.value = responseCurrent.value?.[languageActiveResponse.value];
}



defineExpose({ generateResponse });

</script>

<style lang="scss">
    .aside {
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
    }

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>