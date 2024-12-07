<template>
    <div class="rounded-[10px] border hborder-gray-400 bg-white px-4 py-6 space-y-4 w-[full]">
        <h5 class="text-[14px] font-semibold">Reseñas en los últimos 30 días</h5>
        <div class="flex items-center">
            <p class="text-xs font-semibold htext-gray-500 mr-[4px]">TheHoster REVIEW INDEX™</p>
            <BaseTooltipResponsive
                size="m"
                :top="29"
                :left="-0"
            >
                <template #button>
                    <img class="w-[24px] h-[24px]" src="/assets/icons/TH.INFO.GREEN.svg">
                    </template>
                    <template #content>
                    <p class="text-sm leading-[150%] font-normal">
                        The Hoster Review Index calcula la nota media de las plataformas externas sobre 100.
                    </p>
                </template>
            </BaseTooltipResponsive>
        </div>
        <div class="mt-2 flex justify-between">
            <div>
                <div class="w-max h-max relative ml-[31px] 3xl:ml-[40px]">
                    <div class="text-center absolute position-center">
                        <p class="text-xs font-semibold">{{summaryDataReview?.totalReviews || 0}}</p>
                        <p class="text-xs font-semibold mt-[2px]">opiniones</p>
                    </div>
                    <CircleProgress
                        :size="113"
                        :percent="!reviewStore.otasWithUrls?.length || !summaryDataReview?.averageRatingBaseOneHundred ? 100 : Number(summaryDataReview?.averageRatingBaseOneHundred || 0).toFixed(0)"
                        border-width="12"
                        border-bg-width="12"
                        :linecap="'line'"
                        :fill-color="!reviewStore.otasWithUrls?.length || !summaryDataReview?.averageRatingBaseOneHundred ? '#34A98F' : '#0B6357'"
                        :empty-color="'#ECF9F5'"
                        class="transformCircle"
                    />
                </div>
            </div>
            <div class="w-[265px] 3xl:w-[496px] 3xl:flex justify-center items-center">
                <div class="flex items-center mr-[8px] 3xl:mr-6">
                    <span class="text-[22px] font-medium leading-[0%]"><span class="text-[22px] font-medium">{{ !reviewStore.otasWithUrls?.length ? '--' : Number(summaryDataReview?.averageRatingBaseOneHundred || 0).toFixed(0) }}/</span><span class="text-[16px] font-semibold">100</span></span>
                    <img class="w-[20px] h-[20px] ml-[8px]" src="/assets/icons/1.TH.STAR.GREEN.svg" alt="1.TH.STAR.GREEN">
                </div>
                <div class="mt-[16px] 3xl:mt-0 flex-1">
                    <div class="flex justify-between 3xl:justify-start">
                        <div class="flex items-center">
                            <img class="w-[24px] h-[24px] mr-[4px] 3xl:mr-[8px]" src="/assets/icons/1.TH.ANSWER.REVIEW.svg" alt="1.TH.ANSWER.REVIEW">
                            <p class="text-sm font-medium 3xl:w-[190px]">
                                <template v-if="!reviewStore.otasWithUrls?.length">
                                    --
                                </template>
                                <template v-else>
                                    {{ summaryDataReview?.totalRespondedReviews || 0 }}
                                </template>
                                 reseñas respondidas
                            </p>
                        </div>
                        <span
                            class="text-base font-semibold ml-4"
                            :class="{'htext-green-600': reviewStore.otasWithUrls?.length}"
                        >
                                <template v-if="!reviewStore.otasWithUrls?.length">
                                    --%
                                </template>
                                <template v-else>
                                    {{ percentageRespondedReviews }}%
                                </template>
                        </span>
                    </div>
                    <div class="flex  justify-between 3xl:justify-start mt-[8px]">
                         <div class="flex items-center">
                            <img class="w-[24px] h-[24px] mr-[4px]" src="/assets/icons/1.TH.NOTANSWER.REVIEW.svg" alt="1.TH.ANSWER.REVIEW">
                            <p class="text-sm font-medium 3xl:w-[190px]">
                                <template v-if="!reviewStore.otasWithUrls?.length">
                                    --
                                </template>
                                <template v-else>
                                    {{ summaryDataReview?.totalNotRespondedReviews || 0 }}
                                </template>
                                 reseñas no respondidas
                            </p>
                        </div>
                        <span
                            class="text-base font-semibold ml-4"
                            :class="{'text-[#FF6666]': reviewStore.otasWithUrls?.length}"
                        >
                                <template v-if="!reviewStore.otasWithUrls?.length">
                                    --%
                                </template>
                                <template v-else>
                                    {{ percentageNotRespondedReviews }}%
                                </template>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-4">
            <adminPageSectionSummaryReviewsBar />
        </div>
    </div>
</template>

<script setup>
import { computed, inject } from 'vue';
import CircleProgress from 'vue3-circle-progress';
import "vue3-circle-progress/dist/circle-progress.css";

// COMPONENTS
import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
//
import AdminPageSectionSummaryReviewsBar from './AdminPageSectionSummaryReviewsBar';

// INJECT
const summaryDataReview = inject('summaryDataReview');
const reviewStore = inject('reviewStore');

const percentageRespondedReviews = computed(() => {
    let totalRespondedReview = summaryDataReview.value?.totalRespondedReviews || 0;
    let totalReviews = summaryDataReview.value?.totalReviews || 0;
    if (!totalRespondedReview || !totalReviews) return 0;
    let percentage =  (totalRespondedReview / totalReviews) * 100;
    return percentage.toFixed(0);
});

const percentageNotRespondedReviews = computed(() => {
    let totalNotRespondedReview = summaryDataReview.value?.totalNotRespondedReviews || 0;
    let totalReviews = summaryDataReview.value?.totalReviews || 0;
    if (!totalNotRespondedReview || !totalReviews) return 0;
    let percentage =  (totalNotRespondedReview / totalReviews) * 100;
    return percentage.toFixed(0);
});


</script>