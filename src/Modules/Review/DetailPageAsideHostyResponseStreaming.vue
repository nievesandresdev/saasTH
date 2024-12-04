<template>
<!-- max-h-[554px] -->
    <div class="w-full h-min-[80%] pb-4 flex flex-col  justify-between border-b border-[#BFBFBF]">
        <p class="text-[14px] leading-[150%]" v-html="textGenerateInSteaming" />

        <div class="flex justify-between items-center mt-4">
            <DetailPageAsideHostyResponseStreamingGroupButtonLanguage @change-language="handleChangeLanguage" />
            <!-- <div class="flex justify-end mt-2 w-full">
            </div> -->
                <PaginateResponse @change-page="handleChangePage" />
        </div>
    </div>
    <div class="mt-4 flex justify-end">
        <button
            :disabled="disabledButtons"
            class="text-[12px] font-medium hbtn-primary py-[12px] px-[8px] flex items-center h-[32px] p-[8px] h-[32px] leading-none"
            @click="copyText()"
        >
            <img
                :class="{'opacity-35': disabledButtons}"
                src="/assets/icons/1.TH.COPY.svg"
                class="size-4  mr-2 inline-block"
            >
            Copiar
        </button>
        <button
            class="text-[12px] font-medium hbtn-primary py-[12px] px-[8px] ml-4 flex items-center h-[32px] p-[8px] h-[32px] leading-none"
            :disabled="disabledButtons || numbersResponsesGenerated >= maximumResponsesGenerated"
            @click="generateNewResponse"
        >
            Generar otra respuesta
            <img
                :class="{'opacity-35': disabledButtons}"
                src="/assets/icons/1.TH.IA.svg"
                class="size-[16px] ml-2 inline-block"
            >
        </button>
        <BaseTooltipResponsive v-if="numbersResponsesGenerated >= maximumResponsesGenerated" size="s" :top="35" :right="0" class="ml-1">
            <template #button>
                <img class="w-[24px] h-[24px]" src="/assets/icons/TH.INFO.GREEN.svg" />
            </template>
            <template #content>
                <p class="text-sm leading-[150%] font-normal">
                    Has superado el máximo de respuestas generadas permitidas. Hosty puede generar hasta 10 respuestas por reseña.
                </p>
            </template>
        </BaseTooltipResponsive>
    </div>
</template>

<script setup>
import { ref, inject, computed, watch, provide } from 'vue';

// COMPONENTS
import PaginateResponse from './components/PaginateResponses';
import DetailPageAsideHostyResponseStreamingGroupButtonLanguage from './DetailPageAsideHostyResponseStreamingGroupButtonLanguage';
import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';

// EMITS
const emits = defineEmits(['generateResponse', 'change-language']);

// STATE
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStorage = useHotelStore();

// INJECT
const toast = inject('toast');
const translateAndResponseId = inject('translateAndResponseId');
const pageCurrent = inject('pageCurrent');
const responseCurrent = inject('responseCurrent');
const languagesObject = inject('languagesObject');
const loadingHosty = inject('loadingHosty');
const loadingStreaming =  inject('loadingStreaming');
const loadingTranslation =  inject('loadingTranslation');
const responseStringStreaming =  inject('responseStringStreaming');
const responseGenerated =  inject('responseGenerated');
const reviewData = inject('reviewData');
const responseReviewData = inject('responseReviewData');
const otaParamRoute = inject('otaParamRoute');
const textGenerateInSteaming = inject('textGenerateInSteaming');
const languageActiveResponse = inject('languageActiveResponse');
const numbersResponsesGenerated = inject('numbersResponsesGenerated');
const maximumResponsesGenerated = inject('maximumResponsesGenerated');

// COMPOSABLES
import { useCopy } from '@/composables/useCopy';
import { useReviewResponseStore } from '../../stores/modules/reviewResponse';
const reviewResponseStore = useReviewResponseStore();
const copy = useCopy();

// DATA\

// COMPUTED

const translationReady = computed(() => {
    return !!responseCurrent.value?.es || !!responseCurrent.value?.en;
});

const disabledButtons = computed(() => {
    // if (responseReviewData.value.length > 0) {
        // return (!responseGenerated.value && loadingStreaming.value) || loadingTranslation.value;
        return !responseGenerated.value && loadingStreaming.value;
    // } else {
    // }
});

// WATCH
watch(textGenerateInSteaming, (valNew) => {
    // console.log(valNew);
    if (valNew && responseReviewData.value && responseReviewData.value?.[0]){
        //  responseReviewData.value[0].originalLanguage = valNew;
    }
});

// PROVIDE
provide('disabledButtons', disabledButtons);
provide('translationReady', translationReady);

//FUNCTION
function generateNewResponse () {
    emits('generateResponse');
}

defineExpose({ generateNewResponse });

function handleChangePage (page) {
    // if (languageActiveResponse.value && responseCurrent.value?.[languageActiveResponse.value]) {
        resetDataDefault();
    // }
}

async function handleChangeLanguage (lg) {
    if (lg == 'originalLanguage' || translationReady.value) {
        languageActiveResponse.value = lg;
        responseStringStreaming.value = String(responseCurrent.value?.[lg]);
        return;
    }
    translate(lg);
}

function updateResponseCurrent (newResponse) {

    const index = responseReviewData.value.findIndex(item => item._id === responseCurrent.value._id);
    let responseData = responseReviewData.value?.[index] || null;
    if (!!responseData) {
        Object.assign(responseData, newResponse);
    }
}

async function translate (lg) {
    loadingTranslation.value = true;
    const bodyRequest = {
        ota: otaParamRoute.value,
        objectIdTranslateAndResponse: translateAndResponseId.value,
        objectIdResponse: responseCurrent.value._id
    }
    const response = await reviewResponseStore.$tranlate(bodyRequest);
    console.log(response, 'translate');
    const { ok, data } = response;
    if (ok) {
        updateResponseCurrent(data.response);
        languageActiveResponse.value = lg;
        responseStringStreaming.value = responseCurrent.value?.[lg];
    }
    loadingTranslation.value = false;
}

function resetDataDefault () {
    languageActiveResponse.value = 'originalLanguage';
    responseStringStreaming.value = responseCurrent.value?.[languageActiveResponse.value];
}

function copyText () {
    copy.load(textGenerateInSteaming.value);
    toast.warningToast('Texto copiado','top-right');
}


</script>