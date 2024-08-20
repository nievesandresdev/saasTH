<template>
    <div class="space-y-4">
        <div
            v-for="(item, index) in distribution"
            :key="index"
        >
            <p class="text-sm font-medium">{{ item.name }}</p>
            <div class="flex justify-between items-center">
                <div class="progress-container w-[428px] 3xl:w-[668px]">
                    <div :style="{ width: getPercentage(item.numbers) + '%',  borderRadius: getPercentage(item.numbers) == 100 ? '6px' : '6px 0px 0px 6px' }" class="progress"></div>
                </div>
                <span class="text-sm font-medium">{{ item.numbers }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>

import { computed, inject } from 'vue';

const summaryDataReview = inject('summaryDataReview');


const distribution = computed(() => {
    const d = [
       {
           name: 'Muy bien +90',
           value: '5',
           numbers: summaryDataReview.value?.ratingDistribution?.[1] || 0,
       },
       {
           name: 'Bien 70-90',
           value: '4',
           numbers: summaryDataReview.value?.ratingDistribution?.[2] || 0,
       },
       {
           name: 'Aceptable 50-70',
           value: '3',
           numbers: summaryDataReview.value?.ratingDistribution?.[3] || 0,
       },
       {
           name: 'Mal 30-50',
           value: '2',
           numbers: summaryDataReview.value?.ratingDistribution?.[4] || 0,
       },
       {
           name: 'Muy mal 10-30',
           value: '1',
           numbers: summaryDataReview.value?.ratingDistribution?.[5] || 0,
       },
   ];
   return d;
});

function getPercentage(numbersReview) {
    if (!summaryDataReview.value?.totalReviews || !numbersReview) return 0; 
    let calc =  (numbersReview / summaryDataReview.value?.totalReviews) * 100;
    return calc;
}

</script>

<style lang="scss">
    .progress-container {
        width: 100%;
        height: 12px;
        border-radius: 6px;
        background-color: #F2F2F2;
    }

    .progress {
        height: 100%;
        /* border-radius: 6px  0px 0px 6px; */
        background-color: #34A98F; /* puedes cambiar este color */
    }
</style>