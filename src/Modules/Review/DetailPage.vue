<template>
 <div class="bg-[#FAFAFA z-[100]  w-full">
     <div class="flex justify-between">
        <div class="content flex-1 mx-[24px] pb-[70px]">
            <div class="header flex justify-between py-[20px] border-b border-[#BFBFBF] mb-6">
                <div class="space-x-2 flex justify-between w-full">
                    <h1 class="font-medium text-[22px]">Reseña</h1>
                </div>
            </div>
            <SkeletomContent v-if="loadingReview" />
            <template v-else>
                <div class="py-[24px] px-[16px] bg-white rounded-[10px] card mb-6">
                    <div class="flex justify-between  mb-[8px]">
                        <div class="space-x-[8px] flex">
                            <img
                                :src="`/assets/icons/otas/${$capitalize(otaParamRoute)}.svg`"
                                class="w-[24px] h-[24px]"
                            >
                            <h5 class="text-base font-medium">{{ reviewData?.name }}</h5>
                        </div>
                        <div class="flex items-center space-x-[4px]">
                            <span class="font-semibold text-sm">Pendiente</span>
                            <BaseSwichInput v-model="reviewData.isAttended" @change:value="changeStatusAttended()" />
                            <span class="font-semibold text-sm text-[#858181]">Atendida</span>
                        </div>
                    </div>
                    <p class="text-sm mb-[8px]">{{ $formatTimestampDate(reviewData?.publishedAtDate, 'dd/MM/yy') }}</p>
                    <template v-if="otaParamRoute == 'GOOGLE'">
                        <DetailPageDetailGoogle />
                    </template>
                    <template v-if="otaParamRoute == 'EXPEDIA'">
                        <DetailPageDetailExpedia />
                    </template>
                    <template v-if="otaParamRoute == 'BOOKING'">
                        <DetailPageDetailBooking />
                    </template>
                    <template v-if="otaParamRoute == 'TRIPADVISOR'">
                        <DetailPageDetailTripadvisor />
                    </template>
                    <template v-if="otaParamRoute == 'AIRBNB'">
                        <DetailPageDetailAirbnb />
                    </template>
                    <DetailPageImages />
                    <DetailPageTabTranslate class="mt-4" />
                </div>
                <div class="py-[24px] px-[16px] bg-white rounded-[10px] card">
                    <div class="flex justify-between mb-4">
                        <h4 class="text-base font-medium">
                            Respuesta
                        </h4>
                        <div class="text-[10px] font-semibold py-[4px] px-[8px] rounded-full htext-white-100" :class="reviewData.isAnswered ? 'hbg-green-600' : 'hbg-alert-negative'">
                            {{ reviewData.isAnswered ? 'Respondido' : 'No respondido' }}
                        </div>
                    </div>
                    <p v-if="reviewData.isAnswered && reviewData?.responseDate" class="text-sm font-medium mb-2">{{ $formatTimestampDate(reviewData?.responseDate, 'dd/MM/yyyy') }}</p>
                    <p v-if="reviewData.isAnswered" class="text-sm">{{ reviewData.responseText }}</p>
                    <p v-if="!reviewData.isAnswered" class="text-sm htext-gray-500">Parece que aún no has respondido a la reseña de tu huésped. Pídele a Hosty que te genere una respuesta, cópiala y accede a la plataforma externa para responder el comentario.</p>


                    <div class="mt-4 flex justify-end">
                        <button class="text-xs font-medium hbtn-primary py-[12px] px-[8px]">
                            {{ reviewData.isAnswered ? 'Abrir y responder en' : 'Abrir en' }}
                            <img
                                :src="`/assets/icons/otas/${$capitalize(otaParamRoute)}.svg`"
                                class="w-4 h-4 ml-1 inline-block "
                            >
                        </button>
                        <button class="text-xs font-medium hbtn-primary py-[12px] px-[8px] ml-4">
                            Generar con Hosty
                            <img
                                src="/assets/icons/1.TH.IA.svg"
                                class="w-4 h-4 ml-1 inline-block"
                            >
                        </button>

                    </div>
                </div>
            </template>
         </div>
         <div class="sider w-[354px]">
            <SkeletomAside v-if="loadingReview" />
            <DetailPageAsideHosty v-else />
         </div>
     </div>

</div>
        
</template>

<script setup>
import { onMounted, computed, provide, ref, watch } from 'vue';
import { $capitalize, $titleCase } from '@/utils/textWritingTypes';

import { useRoute } from 'vue-router';
const route = useRoute();

import { useReviewStore } from '@/stores/modules/review';
const reviewStore = useReviewStore();
import { useTranslateAndResponseStore } from '@/stores/modules/translateAndResponse';
const translateAndResponseStore = useTranslateAndResponseStore();
import { useUtilStore } from '@/stores/modules/util';
const utilStore = useUtilStore();

 //composable
import { useToastAlert } from '@/composables/useToastAlert';
const toast = useToastAlert();
import { useEventBus } from '@/composables/eventBus';
const { emitEvent } = useEventBus();

// COMPONENTS
import SkeletomAside from './components/SkeletomAside';
import SkeletomContent from './components/SkeletomContent';
import BaseSwichInput from '@/components/Forms/BaseSwichInput';
//
import DetailPageTabTranslate from './DetailPageTabTranslate';
import DetailPageImages from './DetailPageImages';
import DetailPageAsideHosty from './DetailPageAsideHosty';
import DetailPageDetailGoogle from './DetailPageDetailGoogle';
import DetailPageDetailBooking from './DetailPageDetailBooking';
import DetailPageDetailTripadvisor from './DetailPageDetailTripadvisor';
import DetailPageDetailExpedia from './DetailPageDetailExpedia';
import DetailPageDetailAirbnb from './DetailPageDetailAirbnb';

// DATA
const reviewData = ref({
    isAttended: false,
});
const loadingReview = ref(false);
const languages = ref([]);
const languageActiveTranslate = ref('default');
const languageActiveResponse = ref('default');
const responseReviewData = ref({});
const translateReviewData = ref({});
const responseShow = ref(false);

// COMPUTED
const otaParamRoute = computed(() => {
    	return route?.params?.ota?.toUpperCase();
});
const idOtaParamRoute = computed(() => {
    	return route?.params?.id;
});
const languagesObject = computed(() => {
    return languages.value.reduce((acc,item) => {
        acc[item.abbreviation] = item.name;
        return acc;
    },{});
});

const cribadoResponseReview = computed(() => {
    return;
    let originalLanguage = reviewData.value?.languageOrigin??'es';
    let originalLanguageName =  languagesObject.value[originalLanguage];

    var responseText = '';

    switch (languageActiveResponse.value) {
        case 'es':

            response_text = response_review.value?.review_responses?.es
            if (!response_text && original_language == 'es') {
                response_text = response_review.value?.review_responses?.original_language_response
            }
            
            break;

        case 'en':

            response_text = response_review.value?.review_responses?.en
            if (!response_text && original_language == 'en') {
                response_text = response_review.value?.review_responses?.original_language_response
            }
            
            break;

        case 'default':

            response_text = response_review.value?.review_responses?.original_language_response
            
            break;
    
        default:
            break;
    }
    let data = {
        original_language,
        response_text,
    }
    return data
});
const cribadoTranslateReview = computed(() => {
    let languageOrigin = translateReviewData.value?.originalLanguage ?? 'es';
    let originalLanguageName =  languagesObject.value[languageOrigin];
    // let languageOrigin = reviewData.value?.languageOrigin ?? 'es';
    // let originalLanguageName =  languagesObject.value[languageOrigin];


    let travelerTitle = ''
    let travelerText = ''
    let travelerTextNegative = ''
    let travelerTextPositive = ''
    
    switch (languageActiveTranslate.value) {
        case 'es':
            travelerTitle = translateReviewData.value?.reviewTranslations?.spanishTranslation?.travelerTitle ?? reviewData?.travelerTitle;
            travelerText = translateReviewData.value?.reviewTranslations?.spanishtranslation?.travelerText ?? reviewData?.travelerText;
            travelerTextNegative = translateReviewData.value?.reviewTranslations?.spanishTranslation?.travelerTextNegative ?? reviewData?.travelerTextNegative;
            travelerTextPositive = translateReviewData.value?.reviewTranslations?.spanishTranslation?.travelerTextPositive ?? reviewData?.travelerTextPositive;
            
            break;

        case 'en':
            travelerTitle = translateReviewData.value?.reviewTranslations?.englishTranslation?.travelerTitle ?? reviewData.value?.travelerTitle;
            travelerText = translateReviewData.value?.reviewTranslations?.englishTranslation?.traveler_text ?? reviewData.value?.travelerText;
            travelerTextNegative = translateReviewData.value?.reviewTranslations?.englishTranslation?.travelerTextNegative ?? reviewData.value?.travelerTextNegative;
            travelerTextPositive = translateReviewData.value?.reviewTranslations?.englishTranslation?.travelerTextPositive ?? reviewData.value?.travelerTextPositive;
            
            break;
    
        default:
            travelerTitle = reviewData.value?.travelerTitle;
            travelerText = reviewData.value?.travelerText;
            travelerTextNegative = reviewData.value?.travelerTextNegative;
            travelerTextPositive = reviewData.value?.travelerTextPositive;

            break;
    }
    let data = {
        languageOrigin,
        originalLanguageName,
        travelerTitle,
        travelerText,
        travelerTextNegative,
        travelerTextPositive,
    }
    return data
});

watch(idOtaParamRoute, (valNew, valOld) => {
    if (valNew != valOld) {
        loadData();
    }
});

// ONMOUNTED
onMounted(async () => {
    loadData();
});

// PROVIDE
provide('toast', toast);
provide('otaParamRoute', otaParamRoute);
provide('reviewData', reviewData);
provide('languagesObject', languagesObject);
provide('translateReviewData', translateReviewData);
provide('cribadoTranslateReview', cribadoTranslateReview);
provide('languageActiveTranslate', languageActiveTranslate);

// FUNCTION

async function loadData () {
    const promises = [loadReview(), loadTranslateAndResponse(), loadLanguages()];
    await Promise.all(promises);
}

async function changeStatusAttended () {
    let params = {
        reviewId: idOtaParamRoute.value,
        ota: otaParamRoute.value,
    }
    const response = await reviewStore.$updateAttentionStatus(params);
    const { ok, data } = response;
    if (ok) {
        toast.warningToast('Actualizado con éxito','top-right');
        emitEvent('get-reviews');
    } else {
        reviewData.isAttended = !reviewData.isAttended;
        toast.warningToast(response?.message,'top-right');
    }
}

function loadLanguageResponseDefault () {
    
}

async function loadReview () {
    loadingReview.value = true;
    let params = {
        ota: otaParamRoute.value,
        id: idOtaParamRoute.value,
    }
    const response = await reviewStore.$findById(params);
    const { ok, data } = response;
    if (ok) {
        reviewData.value = data.review;
    } else {
        toast.warningToast(response?.message,'top-right');
        route.push({name:'REVIEWS'});
    }
    loadingReview.value = false;
}

async function loadTranslateAndResponse () {
    let params = {
        ota: otaParamRoute.value,
        reviewId: idOtaParamRoute.value,
    }
    const response = await translateAndResponseStore.$findByReviewId(params);
    console.log(response)
    const { ok, data } = response;
    if (ok) {
        responseReviewData.value = data.transAndResDocument.response;
        translateReviewData.value = data.transAndResDocument.translate;
    }
}

async function loadLanguages () {
    const response = await utilStore.$getLanguages();
    const { ok, data } = response;
    if (ok) {
        languages.value = data;
        loadConfigLanguages();
    } else {
        toast.warningToast(response?.message,'top-right');
        route.push({name:'REVIEWS'});
    }
}

function loadConfigLanguages () {
    loadLanguageResponseDefault();

    if (responseReviewData.value?.readResponse) {
        responseShow.value = true;
    }
}

</script>

<style lang="scss">
    .item-skeletom {
        background: #E6E6E6;
        border-radius: 10px;
    }
    .card {
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
    }
</style>