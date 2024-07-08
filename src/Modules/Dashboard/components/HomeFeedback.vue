<template>
    <div class="flex flex-col border border-[#BFBFBF] rounded-lg p-4 mt-7">
        <div class="grid grid-cols-3 gap-4 mt-4">
            <div class="flex flex-col items-start">
                <span class="text-[#0B6357] text-xs font-semibold mb-2">REPUTACIÓN ONLINE</span>
                <div class="flex gap-4">
                    <span class="font-semibold text-sm flex gap-4">
                        Feedback de tus huéspedes
                    </span>
                </div>
            </div>
            <div class="flex items-end">
                <div class="flex gap-4">
                    <span class="font-semibold text-sm flex gap-4">
                        Reseñas por OTAs
                    </span>
                </div>
            </div>
            <div class="flex items-end">
                <div class="flex gap-4">
                    <span class="font-semibold text-sm flex gap-4">
                        Promedio de tu hotel
                    </span>
                </div>
            </div>
        </div>
        <!-- contenido -->
        <div class="grid grid-cols-3 gap-4 mt-4">
            <div class="row-span-2 flex gap-2 flex-col">
                <div class="bg-white border border-[#BFBFBF] rounded-lg overflow-hidden">
                    <div class="py-2 px-3 flex items-center">
                        <span class="text-xs font-semibold">STAY</span>
                    </div>
                    <!--caritas STAY -->
                    <div class="grid grid-cols-5">
                        <div 
                            v-for="feeling in feelingsInStay" 
                            :key="feeling.name" 
                            class="w-full p-2 flex flex-col items-center"
                            :class="{
                                'rounded-bottom-border': feeling.percentage.isMax
                            }"
                        >
                            <img :src="`/assets/icons/reviews/${feeling.name}.svg`" class="w-8 h-8">
                            <span class="text-sm font-medium">{{ feeling.percentage.percentage }}%</span>
                        </div>
                    </div>
                </div>
                <div class="bg-white border border-[#BFBFBF] rounded-lg overflow-hidden">
                    <div class="py-2 px-3 flex items-center">
                        <span class="text-xs font-semibold">POST-STAY</span>
                    </div>
                    <!--caritas POST-STAY -->
                    <div class="grid grid-cols-5">
                        <div 
                            v-for="feeling in feelingsPostStay" 
                            :key="feeling.name" 
                            class="w-full p-2 flex flex-col items-center"
                            :class="{
                                'rounded-bottom-border': feeling.percentage.isMax
                            }"
                        >
                            <img :src="`/assets/icons/reviews/${feeling.name}.svg`" class="w-8 h-8">
                            <span class="text-sm font-medium">{{ feeling.percentage.percentage }}%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white border border-[#BFBFBF] rounded-lg overflow-hidden row-span-2 ">
                <div class="p-4 mt-2">
                    <div class="flex justify-between items-center" >
                        <div class="flex gap-1 items-center w-1/3">
                            <img src="/assets/icons/otas/Booking.svg" alt="Booking">
                            <span class="text-sm font-medium">Booking</span>
                        </div>
                        <span class="text-sm font-medium w-1/3 text-center">{{ bookingReview.data_review.reviews_rating }}/10</span>
                        <div class="flex flex-col items-center font-semibold text-[10px] w-1/3">
                            <span>{{ bookingReview.data_review.reviews_count }}</span>
                            <span>Reseñas</span>
                        </div>
                    </div>
                    <div class="flex justify-between items-center mt-3">
                        <div class="flex gap-1 items-center w-1/3">
                            <img src="/assets/icons/otas/Google.svg" alt="Google">
                            <span class="text-sm font-medium">Google</span>
                        </div>
                        <span class="text-sm font-medium w-1/3 text-center">{{ googleReview.data_review.reviews_rating }}/10</span>
                        <div class="flex flex-col items-center font-semibold text-[10px] w-1/3">
                            <span>{{ googleReview.data_review.reviews_count }}</span>
                            <span>Reseñas</span>
                        </div>
                    </div>
                    <div class="flex justify-between items-center mt-3">
                        <div class="flex gap-1 items-center w-1/3">
                            <img src="/assets/icons/otas/Tripadvisor.svg" alt="Tripadvisor">
                            <span class="text-sm font-medium">Tripadvisor</span>
                        </div>
                        <span class="text-sm font-medium w-1/3 text-center">{{ tripadvisorReview.data_review.reviews_rating }}/10</span>
                        <div class="flex flex-col items-center font-semibold text-[10px] w-1/3">
                            <span>{{ tripadvisorReview.data_review.reviews_count }}</span>
                            <span>Reseñas</span>
                        </div>
                    </div>
                    <div class="flex justify-between items-center mt-3">
                        <div class="flex gap-1 items-center w-1/3">
                            <img src="/assets/icons/otas/Expedia.svg" alt="Expedia">
                            <span class="text-sm font-medium">Expedia</span>
                        </div>
                        <span class="text-sm font-medium w-1/3 text-center">{{ expediaReview.data_review.reviews_rating }}/10</span>
                        <div class="flex flex-col items-center font-semibold text-[10px] w-1/3">
                            <span>{{ expediaReview.data_review.reviews_count }}</span>
                            <span>Reseñas</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white border border-[#BFBFBF] rounded-lg overflow-hidden row-span-2">
                <div class="bg-[#D9F2E9] py-2 px-3 flex items-center gap-3">
                    <span class="text-sm font-semibold">TheHoster REVIEW INDEX™</span>
                </div>
                <div class="p-4 flex gap-4 items-center">
                    <CircleProgress
                        :size="120"
                        :percent="average"
                        border-width="22"
                        border-bg-width	="22"
                        :linecap="'line'"
                        :fill-color="'#34A98F'"
                        :empty-color="'#ECF9F5'"
                        class="transformCircle"
                    />
                        
                    <div class="flex flex-col gap-2 w-1/2">
                        <span class="text-sm">Promedio de todas las OTAs vinculadas a tu hotel</span>
                        <div class="flex items-center">
                            <span class="text-2xl font-semibold">{{ average }}</span>
                            <span class="text-[23.642px] font-semibold">/</span>
                            <span class="text-base font-semibold flex mt-1">100</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import { dataFeedback,dataReviewOTA } from '@/api/services/dashboard/dashboard.services';
import { useToastAlert } from '@/composables/useToastAlert';

import  CircleProgress  from 'vue3-circle-progress';
import "vue3-circle-progress/dist/circle-progress.css";

const toast = useToastAlert();

const feelingsInStay = ref([
    { name: 'VERYGOOD', percentage: '--' },
    { name: 'GOOD', percentage: '--' },
    { name: 'NORMAL', percentage: '--' },
    { name: 'WRONG', percentage: '--' },
    { name: 'VERYWRONG', percentage: '--' },
]);

const feelingsPostStay = ref([
    { name: 'VERYGOOD', percentage: '--' },
    { name: 'GOOD', percentage: '--' },
    { name: 'NORMAL', percentage: '--' },
    { name: 'WRONG', percentage: '--' },
    { name: 'VERYWRONG', percentage: '--' },
]);

const defaultReview = {
    data_review: {
        reviews_rating: '--',
        reviews_count: '--',
    }
};

const tripadvisorReview = ref({ ...defaultReview, ota: 'TRIPADVISOR' });
const expediaReview = ref({ ...defaultReview, ota: 'EXPEDIA' });
const bookingReview = ref({ ...defaultReview, ota: 'BOOKING' });
const googleReview = ref({ ...defaultReview, ota: 'GOOGLE' });

const average = ref(0); 

onMounted(async () => {
    await handleDataFeedback();
    await handleDataOta();
    //await handleOtaTest();
});

const handleDataFeedback = async () => {
    const response = await dataFeedback();
    if (response.ok) {
        const inStay = response.data.inStay;
        const postStay = response.data.postStay;
        
        feelingsInStay.value = feelingsInStay.value.map(feeling => ({
            name: feeling.name,
            percentage: inStay[feeling.name] == 0 ? '--' : inStay[feeling.name],
        }));
        
        feelingsPostStay.value = feelingsPostStay.value.map(feeling => ({
            name: feeling.name,
            percentage: postStay[feeling.name] == 0 ? '--' : postStay[feeling.name],
        }));
    } else {
        toast.errorToast(response.data.message, 'top-right');
    }
};

/* function getCidFromUrl(url) {
    const cidMatch = url.match(/[?&]cid=([^&]+)/);
    return cidMatch ? cidMatch[1] : null;
} */

const handleDataOta = async () => {
    const response = await dataReviewOTA();

    

    if (response.ok) {
        let totalRating = 0;
        let count = 0;
        const reviews = response.data.summaryReviews || [];
        reviews.forEach(review => {
            switch (review.ota) {
                case 'TRIPADVISOR':
                    tripadvisorReview.value = review;
                    break;
                case 'EXPEDIA':
                    expediaReview.value = review;
                    break;
                case 'BOOKING':
                    bookingReview.value = review;
                    break;
                case 'GOOGLE':
                    googleReview.value = review;
                    break;
                default:
                    break;
            }

            if (review.data_review && review.data_review.reviews_rating !== '--') {
                totalRating += parseFloat(review.data_review.reviews_rating);
                count++;
            }

            average.value = count > 0 ? (totalRating / count) * 10 : 0;
        });

        
    } else {
        toast.errorToast(response.data.message, 'top-right');
        average.value = 0; // Ensure average is 0 if there was an error
    }
};


</script>

<style scoped>
.rounded-bottom-border {
    position: relative; 
}

.rounded-bottom-border::after {
    content: ''; 
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 35px; 
    height: 7px; 
    background-color: #0B6357; 
    border-radius: 10px 10px 0 0;
}

.transformCircle { 
    transform: rotate(150deg);
}
</style>
