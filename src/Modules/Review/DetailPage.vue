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
                                :src="`/assets/icons/otas/${$titleCase(otaParamRoute)}.svg`"
                                class="w-[24px] h-[24px]"
                            >
                            <h5 class="text-base font-medium">{{ reviewData?.name }}</h5>
                        </div>
                        <div class="flex items-center space-x-[4px]">
                            <span class="font-semibold text-sm">Pendiente</span>
                            <BaseSwichInput
                                v-model="reviewData.isAttended"
                                @change:value="changeStatusAttended()"
                                color-disabled="#FFC506"
                            />
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
                        <button
                            class="text-xs font-medium hbtn-primary leading-[90%] h-[32px] p-[8px] flex items-center"
                            :disabled="!urlListReviewsInOta"
                            @click="goUrlListReviewsInOta"
                            
                        >
                            {{ !reviewData.isAnswered ? 'Abrir y responder en' : 'Abrir en' }}
                            <img
                                :src="`/assets/icons/otas/${$titleCase(otaParamRoute)}.svg`"
                                class="w-4 h-4 ml-1 inline-block "
                            >
                        </button>
                        <button
                            :disabled="numbersResponsesGenerated >= maximumResponsesGenerated"
                            class="text-xs font-medium hbtn-primary leading-[90%] h-[32px] p-[8px] ml-4 flex items-center"
                            @click="refDetailPageAsideHosty.generateResponse()"
                        >
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
            <SkeletomAside v-show="loadingReview" />
            <DetailPageAsideHosty v-show="!loadingReview" ref="refDetailPageAsideHosty" />
         </div>
     </div>
     <!-- <pre>{{ reviewData?.languageOrigin }}</pre> -->
     <!-- <pre>{{ reviewData }}</pre> -->
</div>
        
</template>

<script setup>
import { onMounted, computed, provide, ref, watch } from 'vue';
import { $capitalize, $titleCase } from '@/utils/textWritingTypes';

import { useRoute } from 'vue-router';
const router = useRoute();

import { useReviewStore } from '@/stores/modules/review';
const reviewStore = useReviewStore();
import { useTranslateAndResponseStore } from '@/stores/modules/translateAndResponse';
const translateAndResponseStore = useTranslateAndResponseStore();
import { useUtilStore } from '@/stores/modules/util';
const utilStore = useUtilStore();

// DATA STATIC
const URLS_LIST_REVIEWS_IN_OTAS = {
    BOOKING: 'https://admin.booking.com/hotel/hoteladmin/extranet_ng/manage/reviews.html',
    EXPEDIA: 'https://apps.expediapartnercentral.com/lodging/review/user_reviews.html?htid=[hotel_id]',
    TRIPADVISOR: 'https://rentals.tripadvisor.com/bookings/reviews',
    GOOGLE: 'https://maps.google.com/?cid=[cid]',
   AIRBNB: 'https://airbnb.com/users/reviews',
}

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
const refDetailPageAsideHosty = ref(null);
const reviewData = ref({
    isAttended: false,
});
const loadingReview = ref(false);
const languages = ref([]);
const languageActiveTranslate = ref('default');
const languageActiveResponse = ref('originalLanguage');
const translateAndResponseId = ref(null);
const responseReviewData = ref([]);
const translateReviewData = ref({});
const responseShow = ref(false);
const maximumResponsesGenerated = ref(10);
const hoteIdExpedia = ref(null);
const hotelOtaData = ref(null);

// COMPUTED
const otaParamRoute = computed(() => {
    	return router?.params?.ota?.toUpperCase();
});
const idOtaParamRoute = computed(() => {
    	return router?.params?.id;
});
const languagesObject = computed(() => {
    return languages.value.reduce((acc,item) => {
        acc[item.abbreviation] = item.name;
        return acc;
    },{});
});

const fullDataTranslateReviews = computed (() => {
    const full = !!reviewData.value?.travelerTitle ||
        !!reviewData.value?.travelerText ||
        !!reviewData.value?.travelerRextNegative ||
        !!reviewData.value?.travelerTextPositive
    return full;
});

const numbersResponsesGenerated = computed(() => {
    return responseReviewData.value?.length;
});

const cribadoTranslateReview = computed(() => {
    let languageOrigin = reviewData.value?.languageOrigin;
    let originalLanguageName =  languagesObject.value[languageOrigin];

    let travelerTitle = reviewData.value?.travelerTitle;
    let travelerText = reviewData.value?.travelerText;
    let travelerTextNegative = reviewData.value?.travelerTextNegative;
    let travelerTextPositive = reviewData.value?.travelerTextPositive;
    switch (languageActiveTranslate.value) {
        case 'es':
            travelerTitle = translateReviewData.value?.es?.travelerTitle ?? reviewData?.travelerTitle;
            travelerText = translateReviewData.value?.es?.travelerText ?? reviewData?.travelerText;
            travelerTextNegative = translateReviewData.value?.es?.travelerTextNegative ?? reviewData?.travelerTextNegative;
            travelerTextPositive = translateReviewData.value?.es?.travelerTextPositive ?? reviewData?.travelerTextPositive;
            
            break;

        case 'en':
            travelerTitle = translateReviewData.value?.en?.travelerTitle ?? reviewData.value?.travelerTitle;
            travelerText = translateReviewData.value?.en?.travelerText ?? reviewData.value?.travelerText;
            travelerTextNegative = translateReviewData.value?.en?.travelerTextNegative ?? reviewData.value?.travelerTextNegative;
            travelerTextPositive = translateReviewData.value?.en?.travelerTextPositive ?? reviewData.value?.travelerTextPositive;
            
            break;
    
        default:


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

const languageActiveResponseOriginal = computed(() => {
    if (!reviewData.value?.languageOrigin) return '';
    let languageActive = languageActiveResponse.value;
    if (languageActive == 'originalLanguage') {
        languageActive = reviewData.value.languageOrigin;
    }
    return languageActive;
});

const urlListReviewsInOta = computed(() => {
    let url = URLS_LIST_REVIEWS_IN_OTAS?.[otaParamRoute.value];
    if (otaParamRoute.value === 'EXPEDIA' && hoteIdExpedia.value) {
        url = url.replace('[hotel_id]', hoteIdExpedia.value);
    }
    if (otaParamRoute.value === 'GOOGLE' &&  hotelOtaData.value?.url) {
        url = hotelOtaData.value.url;
    }
    return url;
});

// WATCH
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
provide('reviewStore', reviewStore);
provide('toast', toast);
provide('router', router);
provide('otaParamRoute', otaParamRoute);
provide('fullDataTranslateReviews', fullDataTranslateReviews);
provide('reviewData', reviewData);
provide('languagesObject', languagesObject);
provide('responseReviewData', responseReviewData);
provide('translateReviewData', translateReviewData);
provide('translateAndResponseId', translateAndResponseId);
provide('cribadoTranslateReview', cribadoTranslateReview);
provide('languageActiveTranslate', languageActiveTranslate);
provide('languageActiveResponse', languageActiveResponse);
provide('languageActiveResponseOriginal', languageActiveResponseOriginal);
provide('numbersResponsesGenerated', numbersResponsesGenerated);
provide('maximumResponsesGenerated', maximumResponsesGenerated);

// FUNCTION
function goUrlListReviewsInOta() {
    window.open(urlListReviewsInOta.value, '_blank');
}
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
        toast.warningToast('Reseña atendida','top-right');
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
    const response = await reviewStore.$findByIdReview(params);
    const { ok, data } = response;
    if (ok) {
        reviewData.value = data.review;
        hoteIdExpedia.value = data.hoteIdExpedia;
        hotelOtaData.value = data.hotelOta;
    }
    // } else {
    //     toast.warningToast(response?.message,'top-right');
    //     router.push({name:'REVIEWS'});
    // }
    loadingReview.value = false;
}

async function loadTranslateAndResponse () {
    let params = {
        ota: otaParamRoute.value,
        reviewId: idOtaParamRoute.value,
    }
    const response = await translateAndResponseStore.$findByReviewId(params);
    const { ok, data } = response;
    if (ok) {
        translateAndResponseId.value =  data.transAndResDocument?._id;
        responseReviewData.value = data.transAndResDocument?.responses || [];
        translateReviewData.value = data.transAndResDocument?.translate;
    }
}

async function loadLanguages () {
    const response = await utilStore.$getLanguages();
    const { ok, data } = response;
    if (ok) {
        languages.value = data;
        loadConfigLanguages();
    }
    // } else {
    //     toast.warningToast(response?.message,'top-right');
    //     router.push({name:'REVIEWS'});
    // }
}

function loadConfigLanguages () {
    loadLanguageResponseDefault();
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