<template>
    <div class="h-[100%] bg-[#FAFAFA] pb-[104px]">
        <adminPageHeader />
        <div class="mt-6 mx-4 flex space-x-4">
            <div class="space-y-6 w-[500px] 3xl:w-[740px]">
                <adminPageSectionSummaryReviews />
                <adminPageSectionResponseHosty />
            </div>
            <div class="space-y-6 w-[500px] 3xl:w-[740px]">
                <adminPageSectionExternalPlataform />
                <adminPageSectionTimeResponse />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, provide, ref, inject } from 'vue';

import AdminPageHeader from './AdminPageHeader';
import AdminPageSectionSummaryReviews from './AdminPageSectionSummaryReviews';
import AdminPageSectionResponseHosty from './AdminPageSectionResponseHosty';
import AdminPageSectionExternalPlataform from './AdminPageSectionExternalPlataform';
import AdminPageSectionTimeResponse from './AdminPageSectionTimeResponse';

import { useReviewStore } from '@/stores/modules/review';
const reviewStore = useReviewStore();

// DATA
const timeRespondedLastThirtyDays = ref(null);
const percentageTimeResponseTwoMonthPrevious = ref(null);
const summaryDataReview = ref({});
const summaryByOta = ref([]);
onMounted(() => {
    loadData();
});

provide('summaryDataReview', summaryDataReview);
provide('summaryByOta', summaryByOta);
provide('reviewStore', reviewStore);
provide('timeRespondedLastThirtyDays', timeRespondedLastThirtyDays);
provide('percentageTimeResponseTwoMonthPrevious', percentageTimeResponseTwoMonthPrevious);

// FUNCTIONS
async function loadData (){
    const response = await reviewStore.$getSummaryGeneral();
    const {ok, data} = response;
    if (ok) {
        summaryDataReview.value = data.summaryAllOtas;
        summaryByOta.value = data.summaryByOta;
        timeRespondedLastThirtyDays.value = data?.timeRespondedLastThirtyDays;
        percentageTimeResponseTwoMonthPrevious.value = data?.percentageTimeResponseTwoMonthPrevious;
        // summaryDataReview.value = [];
        // summaryByOta.value = [];
    }
}
</script>